import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { ContentValidationError, deleteContent, isContentCollection, upsertContent } from "@/lib/db/content";
import { parseJsonBytes, readBoundedBody } from "@/lib/security/request-body";
import { deleteMediaRecord } from "@/lib/db/media";
import { getCloudflareEnv } from "@/lib/cloudflare";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collection, id } = await params;
  if (!isContentCollection(collection)) return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  const body = await readBoundedBody(request, 1_000_000);
  if (!body.ok) return NextResponse.json({ error: "Content payload is too large" }, { status: 413 });
  const input = parseJsonBytes(body.bytes);
  if (!input) return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  try {
    const record = await upsertContent(collection, { ...input, id }, admin.email);
    return NextResponse.json({ record });
  } catch (error) {
    if (error instanceof ContentValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    throw error;
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collection, id } = await params;
  if (!isContentCollection(collection)) return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  const mediaId = await deleteContent(collection, id, admin.email);
  if (mediaId) {
    const asset = await deleteMediaRecord(mediaId, admin.email);
    if (asset) {
      try {
        await getCloudflareEnv().MEDIA.delete(asset.r2_key);
      } catch (error) {
        console.error(JSON.stringify({ event: "linked-media-delete-failed", mediaId,
          error: error instanceof Error ? error.message : "unknown" }));
      }
    }
  }
  return new NextResponse(null, { status: 204 });
}
