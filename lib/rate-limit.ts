/**
 * Best-effort in-memory sliding-window limiter. State lives in the server
 * process, so on serverless hosts each instance counts separately; it still
 * blunts casual abuse of the endpoints that call paid services.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function allow(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }

    recent.push(now);
    hits.set(key, recent);

    if (hits.size > 5000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return true;
  };
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown"
  );
}
