import { NextResponse } from "next/server";
import { getPublicContent } from "@/lib/db/content";
import { defaultPublicContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getPublicContent(), {
      headers: { "cache-control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "public-content-fallback", error: error instanceof Error ? error.message : "unknown" }));
    return NextResponse.json(defaultPublicContent, {
      headers: { "cache-control": "no-store", "x-content-source": "static-fallback" },
    });
  }
}
