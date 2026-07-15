import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { getCloudflareEnv } from "@/lib/cloudflare";
import { deleteMediaRecord } from "@/lib/db/media";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const asset = await deleteMediaRecord((await params).id, admin.email);
  if (!asset) return NextResponse.json({ error: "Media not found" }, { status: 404 });
  try {
    await getCloudflareEnv().MEDIA.delete(asset.r2_key);
  } catch (error) {
    console.error(JSON.stringify({ event: "media-object-delete-failed", id: asset.id, key: asset.r2_key,
      error: error instanceof Error ? error.message : "unknown" }));
  }
  return new NextResponse(null, { status: 204 });
}
