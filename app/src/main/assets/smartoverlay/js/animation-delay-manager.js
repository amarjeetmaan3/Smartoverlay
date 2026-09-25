export function normalizeDelay(value) { return Math.max(0, Number(value) || 0); }
export default normalizeDelay;
