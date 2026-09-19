export class SyncManager {
  constructor() { this.queue = []; this.paused = false; }
  enqueue(action) { if (action) this.queue.push(action); return this.queue.length; }
  next() { return this.paused ? null : this.queue.shift() || null; }
  pause() { this.paused = true; }
  resume() { this.paused = false; }
  clear() { this.queue = []; }
}
export default SyncManager;
