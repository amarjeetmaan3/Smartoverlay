const metrics = { renders: 0, lastRenderMs: 0, startedAt: performance.now() };

export function markControllerRender(startTime) {
  metrics.renders += 1;
  metrics.lastRenderMs = Math.max(0, performance.now() - startTime);
}

export function getControllerPerformance() {
  return { ...metrics, uptimeMs: performance.now() - metrics.startedAt };
}
