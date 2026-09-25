export class LiveSyncEngineV2 {
  constructor() { this.handlers = new Map(); this.connected = false; this.sessionId = null; }
  connect(sessionId) { this.sessionId = sessionId; this.connected = true; this.emit("connection", { connected: true, sessionId }); return this.state(); }
  disconnect() { this.connected = false; this.emit("connection", { connected: false, sessionId: this.sessionId }); }
  on(event, callback) { if (!this.handlers.has(event)) this.handlers.set(event, new Set()); this.handlers.get(event).add(callback); return () => this.handlers.get(event)?.delete(callback); }
  emit(event, data) { for (const cb of this.handlers.get(event) || []) cb(data); }
  state() { return { connected: this.connected, sessionId: this.sessionId }; }
}
export default LiveSyncEngineV2;
