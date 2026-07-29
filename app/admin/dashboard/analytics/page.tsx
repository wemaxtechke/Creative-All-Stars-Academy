"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Eye,
  Gauge,
  Globe2,
  HardDrive,
  Monitor,
  RefreshCw,
  Server,
  Smartphone,
  Tablet,
  TriangleAlert,
} from "lucide-react";

import {
  ANALYTICS_RANGES,
  isAnalyticsApiResponse,
  type AnalyticsApiResponse,
  type AnalyticsBreakdownItem,
  type AnalyticsRange,
  type AnalyticsSeriesPoint,
  type WebsiteAnalyticsData,
} from "@/lib/analytics/types";

const RANGE_LABELS: Record<AnalyticsRange, string> = {
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
};

const numberFormatter = new Intl.NumberFormat("en", { maximumFractionDigits: 0 });
const compactNumberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatMetric(value: number): string {
  return value >= 1_000 ? compactNumberFormatter.format(value) : numberFormatter.format(value);
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;
  return `${value.toFixed(value >= 100 || unitIndex === 0 ? 0 : value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

function formatTimestamp(timestamp: string, range: AnalyticsRange): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;
  return new Intl.DateTimeFormat("en-KE", {
    month: range === "24h" ? undefined : "short",
    day: range === "24h" ? undefined : "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

function devicePresentation(device: string) {
  const normalized = device.toLowerCase();
  if (normalized === "mobile") return { label: "Mobile", icon: Smartphone, color: "bg-amber-400" };
  if (normalized === "tablet") return { label: "Tablet", icon: Tablet, color: "bg-violet-500" };
  if (normalized === "desktop") return { label: "Desktop", icon: Monitor, color: "bg-blue-500" };
  return { label: device || "Other", icon: Monitor, color: "bg-slate-400" };
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Eye;
  tone: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.12em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-[#0b1f3a]">{value}</p>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs font-medium leading-5 text-slate-400">{detail}</p>
    </article>
  );
}

function TrafficChart({ points, range }: { points: AnalyticsSeriesPoint[]; range: AnalyticsRange }) {
  const width = 1000;
  const top = 18;
  const bottom = 224;
  const maxValue = Math.max(1, ...points.flatMap((point) => [point.requests, point.visits]));
  const xFor = (index: number) => (index / Math.max(1, points.length - 1)) * width;
  const yFor = (value: number) => bottom - (value / maxValue) * (bottom - top);
  const requestPoints = points.map((point, index) => `${xFor(index)},${yFor(point.requests)}`).join(" ");
  const visitPoints = points.map((point, index) => `${xFor(index)},${yFor(point.visits)}`).join(" ");
  const areaPoints = `0,${bottom} ${requestPoints} ${width},${bottom}`;
  const labelPoints = points.length > 0
    ? [points[0], points[Math.floor((points.length - 1) / 2)], points[points.length - 1]]
    : [];

  if (points.length === 0) {
    return (
      <div className="grid h-72 place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
        <div className="text-center">
          <BarChart3 className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-bold text-slate-600">No traffic recorded in this period</p>
          <p className="mt-1 text-xs text-slate-400">Try a longer date range.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-5 text-xs font-bold text-slate-500">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" />Requests</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#d50b12]" />Visits</span>
        <span className="ml-auto text-slate-400">Peak {formatMetric(maxValue)}</span>
      </div>
      <svg
        viewBox={`0 0 ${width} 260`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Requests and visits over ${RANGE_LABELS[range].toLowerCase()}`}
        className="h-64 w-full overflow-visible"
      >
        <defs>
          <linearGradient id="request-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity=".24" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((position) => {
          const y = top + position * (bottom - top);
          return <line key={position} x1="0" x2={width} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="6 7" />;
        })}
        <polygon points={areaPoints} fill="url(#request-area)" />
        <polyline points={requestPoints} fill="none" stroke="#3b82f6" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        <polyline points={visitPoints} fill="none" stroke="#d50b12" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        {points.length <= 48 && points.map((point, index) => (
          <circle key={point.timestamp} cx={xFor(index)} cy={yFor(point.requests)} r="4" fill="#3b82f6">
            <title>{`${formatTimestamp(point.timestamp, range)}: ${formatMetric(point.requests)} requests`}</title>
          </circle>
        ))}
        {labelPoints.map((point, index) => (
          <text
            key={point.timestamp}
            x={index === 0 ? 0 : index === labelPoints.length - 1 ? width : width / 2}
            y="255"
            textAnchor={index === 0 ? "start" : index === labelPoints.length - 1 ? "end" : "middle"}
            fill="#94a3b8"
            fontSize="22"
            fontWeight="700"
          >
            {formatTimestamp(point.timestamp, range)}
          </text>
        ))}
      </svg>
    </div>
  );
}

function BreakdownList({
  items,
  renderLabel,
}: {
  items: AnalyticsBreakdownItem[];
  renderLabel: (item: AnalyticsBreakdownItem) => React.ReactNode;
}) {
  const largest = Math.max(1, ...items.map((item) => item.requests));

  if (items.length === 0) {
    return <p className="py-10 text-center text-sm font-medium text-slate-400">No breakdown is available for this period.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.key}>
          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
            <div className="min-w-0 font-bold text-slate-700">{renderLabel(item)}</div>
            <span className="shrink-0 font-extrabold text-[#0b1f3a]">{formatMetric(item.requests)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${(item.requests / largest) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ResponseHealth({ items }: { items: AnalyticsBreakdownItem[] }) {
  const buckets = [
    { label: "2xx successful", start: 200, end: 299, color: "bg-emerald-500", text: "text-emerald-700" },
    { label: "3xx redirects", start: 300, end: 399, color: "bg-amber-400", text: "text-amber-700" },
    { label: "4xx visitor errors", start: 400, end: 499, color: "bg-rose-500", text: "text-rose-700" },
    { label: "5xx server errors", start: 500, end: 599, color: "bg-violet-600", text: "text-violet-700" },
  ].map((bucket) => ({
    ...bucket,
    requests: items.reduce((total, item) => {
      const status = Number(item.key);
      return status >= bucket.start && status <= bucket.end ? total + item.requests : total;
    }, 0),
  }));
  const total = Math.max(1, buckets.reduce((sum, bucket) => sum + bucket.requests, 0));

  return (
    <div>
      <div className="flex h-4 overflow-hidden rounded-full bg-slate-100">
        {buckets.filter((bucket) => bucket.requests > 0).map((bucket) => (
          <div
            key={bucket.label}
            className={bucket.color}
            style={{ width: `${(bucket.requests / total) * 100}%` }}
            title={`${bucket.label}: ${formatMetric(bucket.requests)}`}
          />
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {buckets.map((bucket) => (
          <div key={bucket.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className={`text-xs font-extrabold ${bucket.text}`}>{bucket.label}</p>
            <p className="mt-1 text-xl font-black text-[#0b1f3a]">{formatMetric(bucket.requests)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-7" aria-label="Loading analytics">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="h-36 animate-pulse rounded-2xl bg-slate-200" />)}
      </div>
      <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
    </div>
  );
}

async function requestAnalytics(
  range: AnalyticsRange,
  refreshVersion: number,
  signal: AbortSignal,
): Promise<AnalyticsApiResponse> {
  const response = await fetch(`/api/admin/analytics?range=${range}&refresh=${refreshVersion}`, {
    credentials: "same-origin",
    signal,
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    const message = typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string"
      ? payload.error
      : "Website analytics could not be loaded.";
    throw new Error(message);
  }

  if (!isAnalyticsApiResponse(payload)) {
    throw new Error("The analytics service returned an unexpected response.");
  }

  return payload;
}

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("24h");
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [data, setData] = useState<WebsiteAnalyticsData | null>(null);
  const [missing, setMissing] = useState<string[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    void requestAnalytics(range, refreshVersion, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) return;
        if (!payload.configured) {
          setData(null);
          setMissing(payload.missing);
        } else {
          setMissing(null);
          setData(payload);
        }
      })
      .catch((loadError: unknown) => {
        if (controller.signal.aborted) return;
        setData(null);
        setMissing(null);
        setError(loadError instanceof Error ? loadError.message : "Website analytics could not be loaded.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [range, refreshVersion]);

  const deviceItems = useMemo(() => data?.devices ?? [], [data]);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="brand-gradient brand-grid overflow-hidden rounded-3xl px-6 py-7 text-white shadow-xl sm:px-8 md:py-9">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#ffc400]">
              <BarChart3 className="h-4 w-4" />Website analytics
            </div>
            <h1 className="font-[var(--font-heading)] text-3xl font-extrabold tracking-tight md:text-4xl">Understand your website traffic.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Live, aggregated request statistics from Cloudflare. No visitor identities or personal form information are displayed here.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl border border-white/20 bg-white/10 p-1">
              {ANALYTICS_RANGES.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setLoading(true);
                    setError("");
                    setRange(option);
                  }}
                  disabled={range === option}
                  className={`rounded-lg px-3 py-2 text-xs font-extrabold transition sm:px-4 ${
                    range === option ? "bg-white text-[#0739a6] shadow-sm" : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {option === "24h" ? "24 hours" : option}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                setRefreshVersion((version) => version + 1);
              }}
              disabled={loading}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-wait disabled:opacity-60"
              title="Refresh analytics"
              aria-label="Refresh analytics"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {loading && <LoadingState />}

      {!loading && missing && (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Server className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-amber-700">Ready for Cloudflare connection</p>
              <h2 className="mt-2 text-2xl font-black text-[#0b1f3a]">The analytics dashboard has been installed.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Live data will appear automatically after the following Cloudflare settings are added. The rest of the administration dashboard is unaffected.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {missing.map((setting) => (
                  <code key={setting} className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-extrabold text-amber-800">{setting}</code>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-100 text-red-700">
              <TriangleAlert className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-red-700">Analytics unavailable</p>
              <h2 className="mt-2 text-xl font-black text-[#0b1f3a]">Cloudflare data could not be loaded.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setError("");
                  setRefreshVersion((version) => version + 1);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0739a6] px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                <RefreshCw className="h-4 w-4" />Try again
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading && data && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-semibold text-slate-400">
            <span>Showing {RANGE_LABELS[data.range].toLowerCase()} for <strong className="text-slate-600">{data.hostname}</strong></span>
            <span>Updated {new Date(data.generatedAt).toLocaleString("en-KE")}</span>
          </div>

          <section className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
            <MetricCard
              label="Total visits"
              value={formatMetric(data.summary.visits)}
              detail="Entries from a direct link or another website."
              icon={Eye}
              tone="bg-blue-50 text-blue-700"
            />
            <MetricCard
              label="Requests"
              value={formatMetric(data.summary.requests)}
              detail="Files and pages requested by website visitors."
              icon={Activity}
              tone="bg-violet-50 text-violet-700"
            />
            <MetricCard
              label="Data transferred"
              value={formatBytes(data.summary.dataTransferBytes)}
              detail="Website data delivered through Cloudflare."
              icon={HardDrive}
              tone="bg-emerald-50 text-emerald-700"
            />
            <MetricCard
              label="Cache hit rate"
              value={data.summary.cacheHitRate === null ? "—" : `${data.summary.cacheHitRate.toFixed(1)}%`}
              detail="Requests served directly from Cloudflare cache."
              icon={Gauge}
              tone="bg-amber-50 text-amber-700"
            />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.12em] text-blue-700">Traffic over time</p>
                <h2 className="mt-2 text-xl font-black text-[#0b1f3a]">Website activity</h2>
              </div>
              <p className="text-xs font-medium text-slate-400">Cloudflare data may take a few minutes to finalize.</p>
            </div>
            <TrafficChart points={data.series} range={data.range} />
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.12em] text-blue-700">Audience location</p>
                  <h2 className="mt-2 text-xl font-black text-[#0b1f3a]">Requests by country</h2>
                </div>
                <Globe2 className="h-6 w-6 text-slate-300" />
              </div>
              <BreakdownList
                items={data.countries}
                renderLabel={(item) => (
                  <span className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-1.5 py-1 text-[10px] font-black text-slate-500">{item.key.toUpperCase()}</span>
                    <span className="truncate">{countryName(item.key)}</span>
                  </span>
                )}
              />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.12em] text-violet-700">Visitor technology</p>
                  <h2 className="mt-2 text-xl font-black text-[#0b1f3a]">Requests by device</h2>
                </div>
                <Smartphone className="h-6 w-6 text-slate-300" />
              </div>
              <div className="space-y-5">
                {deviceItems.length === 0 && <p className="py-10 text-center text-sm font-medium text-slate-400">No device data is available for this period.</p>}
                {deviceItems.map((item) => {
                  const presentation = devicePresentation(item.key);
                  const Icon = presentation.icon;
                  const total = Math.max(1, deviceItems.reduce((sum, device) => sum + device.requests, 0));
                  return (
                    <div key={item.key} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-4">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-4">
                            <span className="font-extrabold text-slate-700">{presentation.label}</span>
                            <span className="font-black text-[#0b1f3a]">{formatMetric(item.requests)}</span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div className={`h-full rounded-full ${presentation.color}`} style={{ width: `${(item.requests / total) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-12">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 xl:col-span-7">
              <div className="mb-6">
                <p className="text-xs font-extrabold uppercase tracking-[.12em] text-blue-700">Popular content</p>
                <h2 className="mt-2 text-xl font-black text-[#0b1f3a]">Top public paths</h2>
                <p className="mt-1 text-xs text-slate-400">Administration and Cloudflare system paths are excluded.</p>
              </div>
              {data.topPaths.length === 0 ? (
                <p className="py-10 text-center text-sm font-medium text-slate-400">No public paths were recorded in this period.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {data.topPaths.map((item, index) => (
                    <div key={item.path} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">{index + 1}</span>
                      <code className="min-w-0 flex-1 break-all text-xs font-bold text-slate-600 sm:text-sm">{item.path}</code>
                      <span className="shrink-0 text-sm font-black text-[#0b1f3a]">{formatMetric(item.requests)}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 xl:col-span-5">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.12em] text-emerald-700">Delivery health</p>
                  <h2 className="mt-2 text-xl font-black text-[#0b1f3a]">Response status</h2>
                </div>
                <Activity className="h-6 w-6 text-slate-300" />
              </div>
              <ResponseHealth items={data.statusCodes} />
              {data.cacheStatuses.length > 0 && (
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-[.1em] text-slate-400">Cache outcomes</p>
                  <div className="flex flex-wrap gap-2">
                    {data.cacheStatuses.slice(0, 6).map((item) => (
                      <span key={item.key} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold capitalize text-slate-600">
                        {item.key} <strong className="ml-1 text-[#0b1f3a]">{formatMetric(item.requests)}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm"><Globe2 className="h-5 w-5" /></span>
              <div>
                <h2 className="font-extrabold text-[#0b1f3a]">How Cloudflare counts visits</h2>
                <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                  A visit is a page view that began from a direct link or another website. One visit can include several page and file requests, so visits and requests are expected to differ.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
