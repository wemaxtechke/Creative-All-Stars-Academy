import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { deleteContent, isContentCollection, upsertContent } from "@/lib/db/content";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collection, id } = await params;
  if (!isContentCollection(collection)) return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  const input = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!input) return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  const record = await upsertContent(collection, { ...input, id }, admin.email);
  return NextResponse.json({ record });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collection, id } = await params;
  if (!isContentCollection(collection)) return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  await deleteContent(collection, id, admin.email);
  return new NextResponse(null, { status: 204 });
}
