export class LiveStateManager {
  constructor(initial = {}) { this.state = { ...initial }; }
  set(path, value) { const parts = String(path).split("."); let node = this.state; parts.slice(0, -1).forEach(k => { if (!node[k] || typeof node[k] !== "object") node[k] = {}; node = node[k]; }); node[parts.at(-1)] = value; return this.get(); }
  get() { return structuredClone ? structuredClone(this.state) : JSON.parse(JSON.stringify(this.state)); }
  patch(data = {}) { Object.assign(this.state, data); return this.get(); }
}
export default LiveStateManager;
