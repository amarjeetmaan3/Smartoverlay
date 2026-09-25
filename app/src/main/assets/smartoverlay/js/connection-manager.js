export class ConnectionManager {
  constructor() { this.online = navigator.onLine; this.listeners = new Set(); this._online = () => this.set(true); this._offline = () => this.set(false); window.addEventListener("online", this._online); window.addEventListener("offline", this._offline); }
  onChange(cb) { this.listeners.add(cb); return () => this.listeners.delete(cb); }
  set(value) { this.online = Boolean(value); this.listeners.forEach(cb => cb(this.online)); }
  destroy() { window.removeEventListener("online", this._online); window.removeEventListener("offline", this._offline); this.listeners.clear(); }
}
export default ConnectionManager;
