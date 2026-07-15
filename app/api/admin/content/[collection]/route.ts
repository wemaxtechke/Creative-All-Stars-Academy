import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { ContentValidationError, isContentCollection, upsertContent } from "@/lib/db/content";
import { parseJsonBytes, readBoundedBody } from "@/lib/security/request-body";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collection } = await params;
  if (!isContentCollection(collection)) return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  const body = await readBoundedBody(request, 1_000_000);
  if (!body.ok) {
    return NextResponse.json({ error: "Content payload is too large" }, { status: 413 });
  }
  const input = parseJsonBytes(body.bytes);
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  try {
    const record = await upsertContent(collection, input, admin.email);
    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    if (error instanceof ContentValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    throw error;
  }
}
