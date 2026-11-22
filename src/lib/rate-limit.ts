type Entry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Entry>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

/**
 * Small in-memory fixed-window limiter. It is intentionally process-local:
 * enough to stop casual abuse on a single instance, with no external service.
 * Swap for Upstash/Redis if the site scales horizontally.
 */
export function rateLimit(identifier: string) {
  const now = Date.now();
  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  };
}

export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "anonymous";
  return `contact:${ip}`;
}
