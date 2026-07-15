import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/api";
import { getCloudflareEnv } from "@/lib/cloudflare";
import { listMedia, saveMedia } from "@/lib/db/media";
import { mediaUrl } from "@/lib/media-url";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function validSignature(bytes: Uint8Array, type: string) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  const ascii = (start: number, length: number) => String.fromCharCode(...bytes.slice(start, start + length));
  if (type === "image/webp") return ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP";
  if (type === "image/avif") return ascii(4, 4) === "ftyp" && ["avif", "avis"].includes(ascii(8, 4));
  return false;
}

export async function GET(request: Request) {
  if (!await authorizeAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const media = await listMedia();
  return NextResponse.json({ media: media.map((asset) => ({ ...asset, url: mediaUrl(asset.r2_key) })) });
}

export async function POST(request: Request) {
  const admin = await authorizeAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  const altText = String(form.get("altText") ?? "").trim().slice(0, 300);
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Upload a JPEG, PNG, WebP or AVIF image smaller than 8 MB." }, { status: 400 });
  }
  const buffer = await file.arrayBuffer();
  if (!validSignature(new Uint8Array(buffer), file.type)) {
    return NextResponse.json({ error: "The file content does not match its image type." }, { status: 400 });
  }
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  const id = crypto.randomUUID();
  const key = `uploads/${new Date().toISOString().slice(0, 10)}/${id}-${safeName}`;
  const env = getCloudflareEnv();
  await env.MEDIA.put(key, buffer, {
    httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" },
  });
  try {
    await saveMedia({ id, r2_key: key, filename: file.name, content_type: file.type,
      size_bytes: file.size, alt_text: altText, width: null, height: null, uploaded_by: admin.email });
  } catch (error) {
    await env.MEDIA.delete(key);
    throw error;
  }
  return NextResponse.json({ id, key, url: mediaUrl(key) }, { status: 201 });
}
