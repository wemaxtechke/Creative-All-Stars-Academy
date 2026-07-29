import { NextResponse } from "next/server";

import { authorizeAdminRequest } from "@/lib/auth/api";
import {
  CloudflareAnalyticsError,
  getAnalyticsConfiguration,
  getWebsiteAnalytics,
} from "@/lib/analytics/cloudflare";
import { isAnalyticsRange } from "@/lib/analytics/types";

export const dynamic = "force-dynamic";

const PRIVATE_CACHE_HEADERS = {
  "Cache-Control": "private, max-age=300, stale-while-revalidate=600",
};

export async function GET(request: Request) {
  if (!await authorizeAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const requestedRange = new URL(request.url).searchParams.get("range");
  if (!isAnalyticsRange(requestedRange)) {
    return NextResponse.json(
      { error: "Choose a valid analytics range: 24h, 7d, or 30d." },
      { status: 400, headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const configuration = getAnalyticsConfiguration();
  if (configuration.missing.length > 0) {
    return NextResponse.json(
      { configured: false, missing: configuration.missing },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  }

  try {
    const analytics = await getWebsiteAnalytics(requestedRange, configuration);
    return NextResponse.json(analytics, { headers: PRIVATE_CACHE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cloudflare analytics is unavailable.";
    const status = error instanceof CloudflareAnalyticsError && error.cloudflareStatus === 429 ? 503 : 502;

    console.error(JSON.stringify({
      message: "Website analytics request failed",
      error: message,
      range: requestedRange,
      hostname: configuration.hostname,
    }));

    return NextResponse.json(
      { error: message },
      { status, headers: { "Cache-Control": "private, no-store" } },
    );
  }
}
