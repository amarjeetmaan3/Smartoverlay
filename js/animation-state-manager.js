export class AnimationStateManager {
  constructor() { this.reset(); }
  set(values = {}) { this.state = { ...this.state, ...values }; return this.get(); }
  get() { return { ...this.state }; }
  reset() { this.state = { active: false, playing: false, time: 0, selectedTrack: null }; return this.get(); }
}
export default AnimationStateManager;
