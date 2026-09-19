export class LiveSession {
  constructor(id, data = {}) { this.id = id; this.state = { status: "idle", ...data }; }
  start() { this.state.status = "live"; this.state.startedAt = Date.now(); return this.get(); }
  stop() { this.state.status = "stopped"; this.state.stoppedAt = Date.now(); return this.get(); }
  update(data) { Object.assign(this.state, data); return this.get(); }
  get() { return { id: this.id, ...this.state }; }
}
export default LiveSession;
