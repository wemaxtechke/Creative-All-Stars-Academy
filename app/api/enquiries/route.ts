import { NextResponse } from "next/server";
import { createLead } from "@/lib/db/leads";
import { parseJsonBytes, readBoundedBody } from "@/lib/security/request-body";
import { checkRateLimit } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";

function json(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });
}

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const bounded = await readBoundedBody(request, 20_000);
  if (!bounded.ok) return json({ error: bounded.reason === "too-large" ? "That enquiry is too large." : "Unable to read that enquiry." }, bounded.reason === "too-large" ? 413 : 400);
  const body = parseJsonBytes(bounded.bytes);
  if (!body || body.source !== "ai-chat-admissions") return json({ error: "Please send the admission form again." }, 400);
  if (clean(body.company, 200)) return json({ ok: true, accepted: false }, 202);
  if (!await checkRateLimit(request, "ai-chat-admission", 4, 3_600)) {
    return json({ error: "Too many admission enquiries. Please wait and try again." }, 429);
  }

  const parentName = clean(body.parentName, 120);
  const parentEmail = clean(body.email, 200).toLowerCase();
  const parentPhone = clean(body.phone, 50);
  const studentName = clean(body.childName, 120);
  const gradeApplied = clean(body.gradeApplied, 80);
  const message = clean(body.message, 1_500);
  const acceptedPrivacy = body.acceptedPrivacy === true || clean(body.acceptedPrivacy, 10).toLowerCase() === "true";
  if (!parentName || !parentPhone || !studentName || !gradeApplied || !acceptedPrivacy) {
    return json({ error: "Please complete the required details and accept the privacy notice." }, 400);
  }
  if (parentEmail && !/^\S+@\S+\.\S+$/.test(parentEmail)) {
    return json({ error: "Enter a valid email address or leave it blank." }, 400);
  }

  try {
    const record = await createLead("admission", {
      studentName,
      dateOfBirth: "To be confirmed",
      gender: "To be confirmed",
      gradeApplied,
      parentName,
      parentEmail,
      parentPhone,
      address: "To be confirmed",
      message,
      source: "ai-chat-admissions",
      acceptedPrivacy: true,
    }, request);
    return json({ ok: true, accepted: true, enquiryId: record.id }, 201);
  } catch (error) {
    console.error(JSON.stringify({
      event: "ai_admission_enquiry_create_error",
      error: error instanceof Error ? error.message : "Unknown D1 error",
    }));
    return json({ error: "We couldn’t save your enquiry just now. Please try again or call the school." }, 503);
  }
}
