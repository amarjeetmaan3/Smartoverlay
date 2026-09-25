export class SessionManager {
  constructor() { this.sessions = new Map(); this.activeId = null; }
  create(id, data = {}) { const session = { id, createdAt: Date.now(), ...data }; this.sessions.set(id, session); this.activeId = id; return { ...session }; }
  get(id = this.activeId) { const x = this.sessions.get(id); return x ? { ...x } : null; }
  close(id = this.activeId) { this.sessions.delete(id); if (id === this.activeId) this.activeId = null; }
  all() { return [...this.sessions.values()].map(x => ({ ...x })); }
}
export default SessionManager;
