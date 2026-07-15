import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getCloudflareEnv(): CloudflareEnv {
  return getCloudflareContext().env as CloudflareEnv;
}

export function readRuntimeVariable(name: keyof CloudflareEnv): string {
  try {
    const value = getCloudflareEnv()[name];
    return typeof value === "string" ? value : "";
  } catch {
    return process.env[String(name)] ?? "";
  }
}
