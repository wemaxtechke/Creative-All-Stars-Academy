import "server-only";

import { readRuntimeVariable } from "@/lib/cloudflare";
import type {
  AnalyticsBreakdownItem,
  AnalyticsPathItem,
  AnalyticsRange,
  AnalyticsSeriesPoint,
  WebsiteAnalyticsData,
} from "@/lib/analytics/types";

const CLOUDFLARE_GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const ANALYTICS_TIMEOUT_MS = 12_000;

const RANGE_HOURS: Record<AnalyticsRange, number> = {
  "24h": 24,
  "7d": 24 * 7,
  "30d": 24 * 30,
};

const WEBSITE_ANALYTICS_QUERY = `
  query WebsiteAnalytics($zoneTag: string, $start: Time, $end: Time, $hostname: string) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        summary: httpRequestsAdaptiveGroups(
          limit: 1
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          sum {
            visits
            edgeResponseBytes
          }
        }
        series: httpRequestsAdaptiveGroups(
          limit: 1000
          orderBy: [datetimeHour_ASC]
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          dimensions {
            datetimeHour
          }
          sum {
            visits
            edgeResponseBytes
          }
        }
        countries: httpRequestsAdaptiveGroups(
          limit: 10
          orderBy: [count_DESC]
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          dimensions {
            clientCountryName
          }
        }
        devices: httpRequestsAdaptiveGroups(
          limit: 10
          orderBy: [count_DESC]
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          dimensions {
            clientDeviceType
          }
        }
        statusCodes: httpRequestsAdaptiveGroups(
          limit: 20
          orderBy: [count_DESC]
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          dimensions {
            edgeResponseStatus
          }
        }
        cacheStatuses: httpRequestsAdaptiveGroups(
          limit: 20
          orderBy: [count_DESC]
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          dimensions {
            cacheStatus
          }
        }
        topPaths: httpRequestsAdaptiveGroups(
          limit: 50
          orderBy: [count_DESC]
          filter: {
            datetime_geq: $start
            datetime_lt: $end
            clientRequestHTTPHost: $hostname
            requestSource: "eyeball"
          }
        ) {
          count
          dimensions {
            clientRequestPath
          }
        }
      }
    }
  }
`;

interface GraphqlGroup {
  count?: number | null;
  dimensions?: {
    datetimeHour?: string | null;
    clientCountryName?: string | null;
    clientDeviceType?: string | null;
    edgeResponseStatus?: number | null;
    cacheStatus?: string | null;
    clientRequestPath?: string | null;
  } | null;
  sum?: {
    visits?: number | null;
    edgeResponseBytes?: number | null;
  } | null;
}

interface GraphqlZone {
  summary?: GraphqlGroup[] | null;
  series?: GraphqlGroup[] | null;
  countries?: GraphqlGroup[] | null;
  devices?: GraphqlGroup[] | null;
  statusCodes?: GraphqlGroup[] | null;
  cacheStatuses?: GraphqlGroup[] | null;
  topPaths?: GraphqlGroup[] | null;
}

interface GraphqlAnalyticsResponse {
  data?: {
    viewer?: {
      zones?: GraphqlZone[] | null;
    } | null;
  } | null;
  errors?: Array<{ message?: string | null }> | null;
}

export interface AnalyticsConfiguration {
  zoneId: string;
  token: string;
  hostname: string;
  missing: string[];
}

export class CloudflareAnalyticsError extends Error {
  constructor(message: string, readonly cloudflareStatus?: number) {
    super(message);
    this.name = "CloudflareAnalyticsError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isGraphqlAnalyticsResponse(value: unknown): value is GraphqlAnalyticsResponse {
  return isRecord(value) && ("data" in value || "errors" in value);
}

function finiteNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
}

function groups(value: GraphqlGroup[] | null | undefined): GraphqlGroup[] {
  return Array.isArray(value) ? value : [];
}

function breakdown(
  items: GraphqlGroup[] | null | undefined,
  readKey: (dimensions: NonNullable<GraphqlGroup["dimensions"]>) => string | number | null | undefined,
): AnalyticsBreakdownItem[] {
  return groups(items)
    .map((item) => ({
      key: String(readKey(item.dimensions ?? {}) ?? "").trim(),
      requests: finiteNumber(item.count),
    }))
    .filter((item) => item.key.length > 0 && item.requests > 0);
}

function isPublicWebsitePath(path: string): boolean {
  return !(
    path === "/admin" ||
    path.startsWith("/admin/") ||
    path === "/api/admin" ||
    path.startsWith("/api/admin/") ||
    path.startsWith("/cdn-cgi/")
  );
}

function readHostname(siteUrl: string): string {
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return "";
  }
}

export function getAnalyticsConfiguration(): AnalyticsConfiguration {
  const zoneId = readRuntimeVariable("CLOUDFLARE_ZONE_ID").trim();
  const token = readRuntimeVariable("CLOUDFLARE_ANALYTICS_TOKEN").trim();
  const hostname = readHostname(readRuntimeVariable("NEXT_PUBLIC_SITE_URL").trim());
  const missing: string[] = [];

  if (!zoneId) missing.push("CLOUDFLARE_ZONE_ID");
  if (!token) missing.push("CLOUDFLARE_ANALYTICS_TOKEN");
  if (!hostname) missing.push("NEXT_PUBLIC_SITE_URL");

  return { zoneId, token, hostname, missing };
}

function userFacingCloudflareError(status: number): string {
  if (status === 401 || status === 403) {
    return "Cloudflare rejected the analytics credentials. Check that the token has Analytics: Read access to this zone.";
  }
  if (status === 429) {
    return "Cloudflare temporarily limited analytics requests. Please wait a few minutes and try again.";
  }
  return "Cloudflare analytics is temporarily unavailable. Please try again shortly.";
}

function transformAnalytics(
  zone: GraphqlZone,
  range: AnalyticsRange,
  start: Date,
  end: Date,
  hostname: string,
): WebsiteAnalyticsData {
  const summaryGroup = groups(zone.summary)[0];
  const requests = finiteNumber(summaryGroup?.count);
  const cacheStatuses = breakdown(zone.cacheStatuses, (dimensions) => dimensions.cacheStatus)
    .map((item) => ({ ...item, key: item.key.toLowerCase() }));
  const cacheHits = cacheStatuses
    .filter((item) => item.key === "hit")
    .reduce((total, item) => total + item.requests, 0);

  const series: AnalyticsSeriesPoint[] = groups(zone.series)
    .map((item) => ({
      timestamp: item.dimensions?.datetimeHour ?? "",
      requests: finiteNumber(item.count),
      visits: finiteNumber(item.sum?.visits),
      dataTransferBytes: finiteNumber(item.sum?.edgeResponseBytes),
    }))
    .filter((item) => item.timestamp.length > 0)
    .sort((first, second) => first.timestamp.localeCompare(second.timestamp));

  const topPaths: AnalyticsPathItem[] = groups(zone.topPaths)
    .map((item) => ({
      path: (item.dimensions?.clientRequestPath ?? "").trim(),
      requests: finiteNumber(item.count),
    }))
    .filter((item) => item.path.length > 0 && item.requests > 0 && isPublicWebsitePath(item.path))
    .slice(0, 10);

  return {
    configured: true,
    range,
    start: start.toISOString(),
    end: end.toISOString(),
    generatedAt: new Date().toISOString(),
    hostname,
    summary: {
      requests,
      visits: finiteNumber(summaryGroup?.sum?.visits),
      dataTransferBytes: finiteNumber(summaryGroup?.sum?.edgeResponseBytes),
      cacheHitRate: requests > 0 ? (cacheHits / requests) * 100 : null,
    },
    series,
    countries: breakdown(zone.countries, (dimensions) => dimensions.clientCountryName),
    devices: breakdown(zone.devices, (dimensions) => dimensions.clientDeviceType),
    statusCodes: breakdown(zone.statusCodes, (dimensions) => dimensions.edgeResponseStatus),
    cacheStatuses,
    topPaths,
  };
}

export async function getWebsiteAnalytics(
  range: AnalyticsRange,
  configuration: AnalyticsConfiguration,
): Promise<WebsiteAnalyticsData> {
  const end = new Date();
  const start = new Date(end.getTime() - RANGE_HOURS[range] * 60 * 60 * 1000);

  // Cloudflare Analytics has no in-process Worker binding; GraphQL is its canonical API.
  const response = await fetch(CLOUDFLARE_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${configuration.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: WEBSITE_ANALYTICS_QUERY,
      variables: {
        zoneTag: configuration.zoneId,
        start: start.toISOString(),
        end: end.toISOString(),
        hostname: configuration.hostname,
      },
    }),
    signal: AbortSignal.timeout(ANALYTICS_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new CloudflareAnalyticsError(userFacingCloudflareError(response.status), response.status);
  }

  const payload: unknown = await response.json();
  if (!isGraphqlAnalyticsResponse(payload)) {
    throw new CloudflareAnalyticsError("Cloudflare returned an unexpected analytics response.");
  }

  const graphqlErrors = Array.isArray(payload.errors)
    ? payload.errors.map((error) => error.message).filter((message): message is string => Boolean(message))
    : [];

  if (graphqlErrors.length > 0) {
    console.error(JSON.stringify({
      message: "Cloudflare GraphQL analytics query failed",
      errors: graphqlErrors,
      range,
      hostname: configuration.hostname,
    }));
    const permissionError = graphqlErrors.some((message) => /unauthorized|not authorized|access/i.test(message));
    throw new CloudflareAnalyticsError(
      permissionError
        ? "Cloudflare rejected the analytics credentials. Check that the token has Analytics: Read access to this zone."
        : "Cloudflare could not complete this analytics query. The selected range may exceed the limits of the current plan.",
      permissionError ? 403 : 502,
    );
  }

  const zone = payload.data?.viewer?.zones?.[0];
  if (!zone) {
    throw new CloudflareAnalyticsError(
      "No analytics were returned for this zone. Check the Zone ID and the token's zone access.",
      403,
    );
  }

  return transformAnalytics(zone, range, start, end, configuration.hostname);
}
