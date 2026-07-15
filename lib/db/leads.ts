import { getCloudflareEnv } from "@/lib/cloudflare";

export type LeadType = "contact" | "admission" | "job_application";

type LeadRow = {
  id: string;
  type: LeadType;
  payload: string;
  status: string;
  submitted_at: string;
};

const initialStatus: Record<LeadType, string> = {
  contact: "Unread",
  admission: "Pending",
  job_application: "Pending",
};

export async function createLead(
  type: LeadType,
  payload: Record<string, unknown>,
  request: Request,
) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const ipHash = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const status = initialStatus[type];
  const record = { ...payload, id, status, dateSubmitted: now.slice(0, 10), dateApplied: now.slice(0, 10) };
  await getCloudflareEnv().DB.prepare(`INSERT INTO website_leads
    (id, type, payload, status, submitted_at, updated_at, source_ip_hash, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, type, JSON.stringify(record), status, now, now, ipHash, request.headers.get("user-agent")?.slice(0, 500) ?? "")
    .run();
  return record;
}

export async function listLeads() {
  const result = await getCloudflareEnv().DB.prepare(`SELECT id, type, payload, status, submitted_at
    FROM website_leads ORDER BY submitted_at DESC LIMIT 500`).all<LeadRow>();
  return result.results.map((row) => ({
    ...JSON.parse(row.payload) as Record<string, unknown>,
    id: row.id,
    type: row.type,
    status: row.status,
  }));
}

export async function updateLeadStatus(id: string, status: string, actorEmail: string) {
  const db = getCloudflareEnv().DB;
  const now = new Date().toISOString();
  const row = await db.prepare("SELECT payload FROM website_leads WHERE id = ? LIMIT 1").bind(id).first<{ payload: string }>();
  if (!row) return false;
  const payload = { ...JSON.parse(row.payload) as Record<string, unknown>, status };
  await db.batch([
    db.prepare("UPDATE website_leads SET status = ?, payload = ?, updated_at = ? WHERE id = ?")
      .bind(status, JSON.stringify(payload), now, id),
    db.prepare(`INSERT INTO audit_log
      (id, actor_email, action, resource_type, resource_id, details, created_at)
      VALUES (?, ?, 'status-change', 'lead', ?, ?, ?)`)
      .bind(crypto.randomUUID(), actorEmail, id, JSON.stringify({ status }), now),
  ]);
  return true;
}
