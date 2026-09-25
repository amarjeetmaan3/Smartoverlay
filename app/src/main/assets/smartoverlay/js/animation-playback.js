export class AnimationPlayback {
  constructor(onFrame = () => {}) { this.onFrame = onFrame; this.timer = null; this.last = 0; }
  start() { this.stop(); this.last = performance.now(); const tick = now => { const dt = now - this.last; this.last = now; this.onFrame(dt); this.timer = requestAnimationFrame(tick); }; this.timer = requestAnimationFrame(tick); }
  stop() { if (this.timer) cancelAnimationFrame(this.timer); this.timer = null; }
}
export default AnimationPlayback;
