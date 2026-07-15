import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { isContentCollection, upsertContent } from "@/lib/db/content";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collection } = await params;
  if (!isContentCollection(collection)) return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  if (Number(request.headers.get("content-length") || 0) > 1_000_000) {
    return NextResponse.json({ error: "Content payload is too large" }, { status: 413 });
  }
  const input = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  const record = await upsertContent(collection, input, admin.email);
  return NextResponse.json({ record }, { status: 201 });
}
