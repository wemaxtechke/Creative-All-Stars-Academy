export const ANALYTICS_RANGES = ["24h", "7d", "30d"] as const;

export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];

export interface AnalyticsSeriesPoint {
  timestamp: string;
  requests: number;
  visits: number;
  dataTransferBytes: number;
}

export interface AnalyticsBreakdownItem {
  key: string;
  requests: number;
}

export interface AnalyticsPathItem {
  path: string;
  requests: number;
}

export interface WebsiteAnalyticsData {
  configured: true;
  range: AnalyticsRange;
  start: string;
  end: string;
  generatedAt: string;
  hostname: string;
  summary: {
    requests: number;
    visits: number;
    dataTransferBytes: number;
    cacheHitRate: number | null;
  };
  series: AnalyticsSeriesPoint[];
  countries: AnalyticsBreakdownItem[];
  devices: AnalyticsBreakdownItem[];
  statusCodes: AnalyticsBreakdownItem[];
  cacheStatuses: AnalyticsBreakdownItem[];
  topPaths: AnalyticsPathItem[];
}

export interface AnalyticsNotConfigured {
  configured: false;
  missing: string[];
}

export type AnalyticsApiResponse = WebsiteAnalyticsData | AnalyticsNotConfigured;

export function isAnalyticsRange(value: string | null): value is AnalyticsRange {
  return ANALYTICS_RANGES.some((range) => range === value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isAnalyticsApiResponse(value: unknown): value is AnalyticsApiResponse {
  if (!isRecord(value) || typeof value.configured !== "boolean") return false;

  if (!value.configured) {
    return Array.isArray(value.missing) && value.missing.every((item) => typeof item === "string");
  }

  return (
    typeof value.range === "string" &&
    isAnalyticsRange(value.range) &&
    typeof value.start === "string" &&
    typeof value.end === "string" &&
    typeof value.generatedAt === "string" &&
    typeof value.hostname === "string" &&
    isRecord(value.summary) &&
    Array.isArray(value.series) &&
    Array.isArray(value.countries) &&
    Array.isArray(value.devices) &&
    Array.isArray(value.statusCodes) &&
    Array.isArray(value.cacheStatuses) &&
    Array.isArray(value.topPaths)
  );
}
