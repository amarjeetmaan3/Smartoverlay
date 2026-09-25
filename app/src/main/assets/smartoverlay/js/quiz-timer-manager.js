export class QuizTimerManager {
  constructor() { this.remaining = 0; this.timer = null; this.running = false; this.onTick = () => {}; this.onExpire = () => {}; }
  start(seconds, onTick = () => {}, onExpire = () => {}) {
    this.stop(); this.remaining = Math.max(0, Number(seconds) || 0);
    this.onTick = onTick; this.onExpire = onExpire; this.running = true;
    this.timer = setInterval(() => {
      this.remaining = Math.max(0, this.remaining - 1); this.onTick(this.remaining);
      if (this.remaining <= 0) { this.stop(); this.onExpire(); }
    }, 1000);
    this.onTick(this.remaining); return this.remaining;
  }
  pause() { if (!this.running) return; clearInterval(this.timer); this.timer = null; this.running = false; }
  resume() { if (!this.running && this.remaining > 0) this.start(this.remaining, this.onTick, this.onExpire); }
  stop() { clearInterval(this.timer); this.timer = null; this.running = false; }
  reset(seconds = 0) { this.stop(); this.remaining = Math.max(0, Number(seconds) || 0); }
}
export default QuizTimerManager;
