/** Normalize API JSON error bodies for user-visible messages. */

export function messageFromApiError(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;
  const o = data as Record<string, unknown>;
  if (typeof o.message === "string" && o.message.trim()) return o.message.trim();
  if (typeof o.error === "string" && o.error.trim()) {
    const e = o.error.replace(/_/g, " ").trim();
    return e ? e.charAt(0).toUpperCase() + e.slice(1) : fallback;
  }
  return fallback;
}
