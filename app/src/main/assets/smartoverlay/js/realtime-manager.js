export class RealtimeManager {
  constructor() { this.listeners = new Map(); }
  subscribe(path, callback) { this.listeners.set(path, callback); return () => this.listeners.delete(path); }
  publish(path, data) { this.listeners.get(path)?.(data); }
  clear() { this.listeners.clear(); }
}
export default RealtimeManager;
