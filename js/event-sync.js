export function createLiveEvent(type, payload = {}) {
  return { id: Date.now().toString(36) + Math.random().toString(36).slice(2), type, payload, timestamp: Date.now() };
}
export default createLiveEvent;
