import { getAdminIdentity } from "@/lib/auth/admin";

export async function authorizeAdminRequest(request: Request) {
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) return null;
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite && !["same-origin", "same-site"].includes(fetchSite)) return null;
  }
  return getAdminIdentity(request.headers);
}
