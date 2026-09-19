export class DeviceManager {
  constructor() { this.devices = new Map(); }
  register(id, data = {}) { const device = { id, lastSeen: Date.now(), ...data }; this.devices.set(id, device); return { ...device }; }
  heartbeat(id) { const x = this.devices.get(id); if (x) x.lastSeen = Date.now(); return x ? { ...x } : null; }
  remove(id) { this.devices.delete(id); }
  all() { return [...this.devices.values()].map(x => ({ ...x })); }
}
export default DeviceManager;
