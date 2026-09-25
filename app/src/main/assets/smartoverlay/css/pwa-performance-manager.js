const startedAt = performance.now();
export function getPWAPerformance() {
  return { uptimeMs: performance.now() - startedAt, memory: performance.memory || null };
}
