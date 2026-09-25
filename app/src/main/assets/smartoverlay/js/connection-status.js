export function getConnectionStatus() {
  return { online: typeof navigator !== "undefined" ? navigator.onLine : true, timestamp: Date.now() };
}
export default getConnectionStatus;
