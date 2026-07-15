import { getCloudflareEnv } from "@/lib/cloudflare";

export type LeadType = "contact" | "admission" | "job_application";

type LeadRow = {
  id: string;
  type: LeadType;
  payload: string;
  status: string;
  submitted_at: string;
};

export type LeadDocumentInput = {
  id: string;
  r2Key: string;
  filename: string;
  contentType: "application/pdf";
  sizeBytes: number;
};

export type LeadDocument = {
  id: string;
  lead_id: string;
  r2_key: string;
  filename: string;
  content_type: "application/pdf";
  size_bytes: number;
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
  options: { id?: string; document?: LeadDocumentInput } = {},
) {
  const id = options.id ?? crypto.randomUUID();
  const now = new Date().toISOString();
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const ipHash = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const status = initialStatus[type];
  const record = {
    ...payload,
    id,
    status,
    dateSubmitted: now.slice(0, 10),
    dateApplied: now.slice(0, 10),
    ...(options.document ? { resumeUrl: `/api/admin/leads/${id}/document` } : {}),
  };
  const db = getCloudflareEnv().DB;
  const statements = [
    db.prepare(`INSERT INTO website_leads
      (id, type, payload, status, submitted_at, updated_at, source_ip_hash, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, type, JSON.stringify(record), status, now, now, ipHash, request.headers.get("user-agent")?.slice(0, 500) ?? ""),
  ];
  if (options.document) {
    statements.push(
      db.prepare(`INSERT INTO lead_documents
        (id, lead_id, r2_key, filename, content_type, size_bytes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(options.document.id, id, options.document.r2Key, options.document.filename,
          options.document.contentType, options.document.sizeBytes, now),
    );
  }
  await db.batch(statements);
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
  const row = await db.prepare("SELECT type, payload FROM website_leads WHERE id = ? LIMIT 1")
    .bind(id)
    .first<{ type: LeadType; payload: string }>();
  if (!row) return false;
  const validStatuses: Record<LeadType, string[]> = {
    contact: ["Unread", "Read", "Archived"],
    admission: ["Pending", "Approved", "Rejected"],
    job_application: ["Pending", "Shortlisted", "Rejected", "Hired"],
  };
  if (!validStatuses[row.type].includes(status)) return false;
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

export async function getLeadDocument(leadId: string) {
  return getCloudflareEnv().DB.prepare(`SELECT id, lead_id, r2_key, filename, content_type, size_bytes
    FROM lead_documents WHERE lead_id = ? LIMIT 1`)
    .bind(leadId)
    .first<LeadDocument>();
}
