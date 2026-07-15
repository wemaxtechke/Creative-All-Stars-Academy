import { createRemoteJWKSet, jwtVerify } from "jose";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { readRuntimeVariable } from "@/lib/cloudflare";

export type AdminIdentity = { email: string };

function allowedAdminEmails() {
  return readRuntimeVariable("ADMIN_EMAILS")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function verifiedAccessEmail(requestHeaders: Headers) {
  const token = requestHeaders.get("cf-access-jwt-assertion");
  const teamDomain = readRuntimeVariable("ACCESS_TEAM_DOMAIN").replace(/\/$/, "");
  const audience = readRuntimeVariable("ACCESS_AUD");
  if (!token || !teamDomain || !audience) return null;
  try {
    const jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
    const { payload } = await jwtVerify(token, jwks, {
      issuer: teamDomain,
      audience,
    });
    return typeof payload.email === "string" ? payload.email.trim().toLowerCase() : null;
  } catch {
    return null;
  }
}

export async function getAdminIdentity(requestHeaders: Headers): Promise<AdminIdentity | null> {
  const localEmail = process.env.NODE_ENV === "development"
    ? readRuntimeVariable("LOCAL_ADMIN_EMAIL").trim().toLowerCase()
    : "";
  const email = localEmail || await verifiedAccessEmail(requestHeaders);
  if (!email || !allowedAdminEmails().includes(email)) return null;
  return { email };
}

export async function requireAdmin() {
  const identity = await getAdminIdentity(await headers());
  if (!identity) redirect("/admin/login?unauthorized=1");
  return identity;
}
