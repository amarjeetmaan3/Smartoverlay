export class RealtimePresence {
  constructor() { this.members = new Map(); }
  join(id, data = {}) { const x = { id, ...data, lastSeen: Date.now() }; this.members.set(id, x); return { ...x }; }
  heartbeat(id) { const x = this.members.get(id); if (x) x.lastSeen = Date.now(); return x ? { ...x } : null; }
  leave(id) { this.members.delete(id); }
  all() { return [...this.members.values()].map(x => ({ ...x })); }
}
export default RealtimePresence;
