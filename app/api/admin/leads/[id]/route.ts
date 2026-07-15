import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { updateLeadStatus } from "@/lib/db/leads";

const allowedStatuses = new Set(["Unread", "Read", "Archived", "Pending", "Approved", "Rejected", "Shortlisted", "Hired"]);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { status?: string } | null;
  if (!body?.status || !allowedStatuses.has(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const updated = await updateLeadStatus((await params).id, body.status, admin.email);
  return updated ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Lead not found" }, { status: 404 });
}
