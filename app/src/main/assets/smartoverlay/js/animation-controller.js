export class AnimationController {
  constructor(engine) { this.engine = engine; }
  play() { return this.engine.play(); }
  pause() { return this.engine.pause(); }
  stop() { return this.engine.stop(); }
  seek(ms) { return this.engine.seek(ms); }
  add(id, animation) { return this.engine.add(id, animation); }
}
export default AnimationController;
