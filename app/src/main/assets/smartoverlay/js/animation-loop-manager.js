export class AnimationLoopManager {
  constructor() { this.loop = false; this.repeat = 0; this.count = 0; }
  configure({ loop = false, repeat = 0 } = {}) { this.loop = Boolean(loop); this.repeat = Math.max(0, Number(repeat) || 0); this.count = 0; return this.get(); }
  shouldRepeat() { if (this.loop) return true; if (this.count < this.repeat) { this.count++; return true; } return false; }
  get() { return { loop: this.loop, repeat: this.repeat, count: this.count }; }
}
export default AnimationLoopManager;
