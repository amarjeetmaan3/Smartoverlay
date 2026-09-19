export class AnimationTrackManager {
  constructor() { this.tracks = []; }
  add(track = {}) { const x = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), ...track, keyframes: track.keyframes || [] }; this.tracks.push(x); return x; }
  remove(id) { this.tracks = this.tracks.filter(x => x.id !== id); }
  get(id) { return this.tracks.find(x => x.id === id) || null; }
  all() { return this.tracks.map(x => ({ ...x, keyframes: [...x.keyframes] })); }
}
export default AnimationTrackManager;
