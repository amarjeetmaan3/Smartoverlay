export class AnimationSequenceManager {
  constructor() { this.sequence = []; }
  add(id, start = 0, duration = 1000) { const x = { id, start: Math.max(0, Number(start) || 0), duration: Math.max(0, Number(duration) || 0) }; this.sequence.push(x); return x; }
  remove(id) { this.sequence = this.sequence.filter(x => x.id !== id); }
  sort() { this.sequence.sort((a, b) => a.start - b.start); return this.sequence; }
  all() { return this.sequence.map(x => ({ ...x })); }
}
export default AnimationSequenceManager;
