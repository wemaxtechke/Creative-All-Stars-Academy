import { getCloudflareEnv } from "@/lib/cloudflare";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const key = (await params).key.join("/");
  if (key.startsWith("private/")) return new Response("Not found", { status: 404 });
  const object = await getCloudflareEnv().MEDIA.get(key);
  if (!object || !object.body) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", object.httpMetadata?.cacheControl ?? "public, max-age=86400, stale-while-revalidate=604800");
  headers.set("x-content-type-options", "nosniff");
  headers.set("content-security-policy", "default-src 'none'; sandbox");
  return new Response(object.body, { headers });
}
