import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { getCloudflareEnv } from "@/lib/cloudflare";
import { getLeadDocument } from "@/lib/db/leads";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await authorizeAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const document = await getLeadDocument((await params).id);
  if (!document) return NextResponse.json({ error: "Document not found" }, { status: 404 });
  const object = await getCloudflareEnv().MEDIA.get(document.r2_key);
  if (!object?.body) return NextResponse.json({ error: "Document file is unavailable" }, { status: 404 });

  const safeFilename = document.filename.replace(/["\r\n]/g, "");
  return new Response(object.body, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${safeFilename}"`,
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
      "content-security-policy": "default-src 'none'; sandbox",
    },
  });
}
