export function createTimerState(data = {}) {
  return { remaining: Math.max(0, Number(data.remaining) || 0), running: Boolean(data.running), updatedAt: Date.now() };
}
export default createTimerState;
