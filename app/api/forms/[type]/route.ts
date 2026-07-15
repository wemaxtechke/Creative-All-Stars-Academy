import { NextResponse } from "next/server";
import { createLead, type LeadType } from "@/lib/db/leads";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";

const routeTypes: Record<string, LeadType> = {
  contact: "contact",
  admissions: "admission",
  careers: "job_application",
};

function clean(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const leadType = routeTypes[(await params).type];
  if (!leadType) return NextResponse.json({ error: "Unknown form" }, { status: 404 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || body.company) return NextResponse.json({ ok: true });
  if (!await checkRateLimit(request, `form:${leadType}`)) {
    return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
  }
  if (!await verifyTurnstile(request, clean(body.turnstileToken, 2048))) {
    return NextResponse.json({ error: "Please complete the security check and try again." }, { status: 403 });
  }

  const payload = Object.fromEntries(Object.entries(body)
    .filter(([key]) => !["turnstileToken", "company"].includes(key))
    .map(([key, value]) => [key, clean(value, key === "message" ? 4000 : 300)]));
  const email = clean(payload.email || payload.parentEmail, 200).toLowerCase();
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!clean(payload.name || payload.parentName || payload.applicantName) || !email) {
    return NextResponse.json({ error: "Please complete the required contact details." }, { status: 400 });
  }
  if (leadType === "admission" && !clean(payload.studentName)) {
    return NextResponse.json({ error: "Please enter the learner's name." }, { status: 400 });
  }
  if (leadType === "admission" && clean(payload.acceptedPrivacy).toLowerCase() !== "true") {
    return NextResponse.json({ error: "Please accept the privacy notice before submitting." }, { status: 400 });
  }
  const record = await createLead(leadType, payload, request);
  return NextResponse.json({ ok: true, record }, { status: 201 });
}
