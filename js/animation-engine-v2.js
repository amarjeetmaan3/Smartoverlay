export class AnimationEngineV2 {
  constructor() { this.animations = new Map(); this.playing = false; this.time = 0; }
  add(id, animation) { this.animations.set(id, { ...animation }); return this.get(id); }
  remove(id) { this.animations.delete(id); }
  get(id) { const a = this.animations.get(id); return a ? { ...a } : null; }
  play() { this.playing = true; return this.state(); }
  pause() { this.playing = false; return this.state(); }
  stop() { this.playing = false; this.time = 0; return this.state(); }
  seek(ms) { this.time = Math.max(0, Number(ms) || 0); return this.state(); }
  state() { return { playing: this.playing, time: this.time, count: this.animations.size }; }
}
export default AnimationEngineV2;
