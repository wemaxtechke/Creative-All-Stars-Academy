import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { getPublicContent } from "@/lib/db/content";
import { listLeads } from "@/lib/db/leads";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!await authorizeAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [content, leads] = await Promise.all([getPublicContent(), listLeads()]);
  return NextResponse.json({
    ...content,
    admissions: leads.filter((lead) => lead.type === "admission"),
    messages: leads.filter((lead) => lead.type === "contact"),
    jobApplications: leads.filter((lead) => lead.type === "job_application"),
  });
}
