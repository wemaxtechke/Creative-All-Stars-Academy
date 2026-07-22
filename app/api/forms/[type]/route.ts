import { NextResponse } from "next/server";
import { getCloudflareEnv } from "@/lib/cloudflare";
import { createLead, type LeadDocumentInput, type LeadType } from "@/lib/db/leads";
import { exactArrayBuffer, readBoundedBody, parseJsonBytes } from "@/lib/security/request-body";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";

const routeTypes: Record<string, LeadType> = {
  contact: "contact",
  admissions: "admission",
  careers: "job_application",
};

const allowedFields: Record<LeadType, ReadonlySet<string>> = {
  contact: new Set(["name", "email", "phone", "subject", "message"]),
  admission: new Set([
    "studentName", "dateOfBirth", "gender", "gradeApplied", "parentName",
    "parentEmail", "parentPhone", "address", "acceptedPrivacy",
  ]),
  job_application: new Set(["jobId", "jobTitle", "applicantName", "email", "phone"]),
};

type ParsedSubmission =
  | { ok: true; body: Record<string, unknown>; file: File | null }
  | { ok: false; error: string };

function clean(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanPayload(type: LeadType, body: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(body)
      .filter(([key]) => allowedFields[type].has(key))
      .map(([key, value]) => [key, clean(value, key === "message" ? 4000 : 300)]),
  );
}

async function parseSubmission(request: Request, leadType: LeadType): Promise<ParsedSubmission> {
  const multipart = request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data") === true;
  const maxBytes = multipart && leadType === "job_application" ? 3_500_000 : 32_000;
  const bodyResult = await readBoundedBody(request, maxBytes);
  if (!bodyResult.ok) return { ok: false, error: bodyResult.reason === "too-large" ? "Submission is too large." : "Unable to read submission." };

  if (!multipart) {
    const body = parseJsonBytes(bodyResult.bytes);
    return body ? { ok: true, body, file: null } : { ok: false, error: "Invalid submission." };
  }

  if (leadType !== "job_application") return { ok: false, error: "Unsupported form format." };
  try {
    const clone = new Request(request.url, {
      method: "POST",
      headers: { "content-type": request.headers.get("content-type") ?? "" },
      body: exactArrayBuffer(bodyResult.bytes),
    });
    const form = await clone.formData();
    const body = Object.fromEntries(Array.from(form.entries())
      .filter(([, value]) => typeof value === "string")) as Record<string, unknown>;
    const file = form.get("resume");
    return { ok: true, body, file: file instanceof File ? file : null };
  } catch {
    return { ok: false, error: "Invalid application form." };
  }
}

function validateSubmission(type: LeadType, payload: Record<string, string>) {
  const email = clean(payload.email || payload.parentEmail, 200).toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
  if (!clean(payload.name || payload.parentName || payload.applicantName)) return "Please provide your name.";
  if (type === "contact" && (!clean(payload.subject) || !clean(payload.message))) return "Enter a subject and message.";
  if (type === "admission" && (!clean(payload.studentName) || !clean(payload.parentPhone) || !clean(payload.gradeApplied))) {
    return "Complete the learner and parent contact details.";
  }
  if (type === "admission" && clean(payload.acceptedPrivacy).toLowerCase() !== "true") {
    return "Please accept the privacy notice before submitting.";
  }
  if (type === "job_application" && (!clean(payload.jobId) || !clean(payload.jobTitle) || !clean(payload.phone))) {
    return "Complete the vacancy and contact details.";
  }
  return null;
}

function validPdf(file: File | null) {
  return Boolean(file && file.type === "application/pdf" && file.size > 0 && file.size <= 3 * 1024 * 1024);
}

export async function POST(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const leadType = routeTypes[(await params).type];
  if (!leadType) return NextResponse.json({ error: "Unknown form" }, { status: 404 });

  const parsed = await parseSubmission(request, leadType);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: parsed.error.includes("large") ? 413 : 400 });
  if (parsed.body.company) return NextResponse.json({ ok: true });
  if (!await checkRateLimit(request, `form:${leadType}`)) {
    return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
  }
  if (!await verifyTurnstile(request, clean(parsed.body.turnstileToken, 2048), "turnstile-spin-v2")) {
    return NextResponse.json({ error: "Please complete the security check and try again." }, { status: 403 });
  }

  const payload = cleanPayload(leadType, parsed.body) as Record<string, string>;
  const validationError = validateSubmission(leadType, payload);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  if (leadType === "job_application") {
    const vacancy = await getCloudflareEnv().DB.prepare(`SELECT payload FROM content_items
      WHERE collection = 'jobs' AND id = ? AND is_published = 1 LIMIT 1`)
      .bind(payload.jobId).first<{ payload: string }>();
    if (!vacancy) return NextResponse.json({ error: "This vacancy is no longer available." }, { status: 409 });
    let storedJob: { title?: unknown; deadline?: unknown; isActive?: unknown };
    try {
      storedJob = JSON.parse(vacancy.payload) as typeof storedJob;
    } catch {
      return NextResponse.json({ error: "This vacancy is no longer available." }, { status: 409 });
    }
    const deadline = String(storedJob.deadline ?? "");
    if (storedJob.isActive === false || !deadline || deadline < new Date().toISOString().slice(0, 10)) {
      return NextResponse.json({ error: "Applications for this vacancy are closed." }, { status: 409 });
    }
    payload.jobTitle = clean(storedJob.title, 300);
  }

  if (leadType !== "job_application") {
    const record = await createLead(leadType, payload, request);
    return NextResponse.json({ ok: true, record }, { status: 201 });
  }

  if (!validPdf(parsed.file)) {
    return NextResponse.json({ error: "Attach a PDF CV smaller than 3 MB." }, { status: 400 });
  }
  const file = parsed.file as File;
  const buffer = await file.arrayBuffer();
  if (new TextDecoder().decode(new Uint8Array(buffer).slice(0, 5)) !== "%PDF-") {
    return NextResponse.json({ error: "The attached file is not a valid PDF." }, { status: 400 });
  }

  const leadId = crypto.randomUUID();
  const documentId = crypto.randomUUID();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "cv.pdf";
  const key = `private/job-applications/${new Date().toISOString().slice(0, 10)}/${leadId}-${documentId}-${safeName}`;
  const document: LeadDocumentInput = {
    id: documentId,
    r2Key: key,
    filename: file.name.slice(0, 240),
    contentType: "application/pdf",
    sizeBytes: file.size,
  };
  const env = getCloudflareEnv();
  await env.MEDIA.put(key, buffer, { httpMetadata: { contentType: "application/pdf", cacheControl: "private, no-store" } });
  try {
    const record = await createLead(leadType, payload, request, { id: leadId, document });
    return NextResponse.json({ ok: true, record }, { status: 201 });
  } catch (error) {
    await env.MEDIA.delete(key);
    throw error;
  }
}
