export class AnimationTimeline {
  constructor() { this.duration = 10000; this.currentTime = 0; this.zoom = 1; }
  setDuration(ms) { this.duration = Math.max(0, Number(ms) || 0); return this.duration; }
  seek(ms) { this.currentTime = Math.max(0, Math.min(this.duration, Number(ms) || 0)); return this.currentTime; }
  progress() { return this.duration ? this.currentTime / this.duration : 0; }
  reset() { this.currentTime = 0; return this.currentTime; }
}
export default AnimationTimeline;
