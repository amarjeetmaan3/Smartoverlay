export class AnimationManager {
  constructor() { this.items = new Map(); }
  create(id, config = {}) { this.items.set(id, { id, duration: 1000, delay: 0, easing: "linear", ...config }); return this.get(id); }
  update(id, config = {}) { const x = this.items.get(id); if (!x) return null; Object.assign(x, config); return this.get(id); }
  remove(id) { this.items.delete(id); }
  get(id) { const x = this.items.get(id); return x ? { ...x } : null; }
  all() { return [...this.items.values()].map(x => ({ ...x })); }
}
export default AnimationManager;
