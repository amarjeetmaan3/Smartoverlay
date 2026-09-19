export class LiveHistory {
  constructor(limit = 100) { this.limit = limit; this.items = []; }
  push(item) { this.items.push(item); if (this.items.length > this.limit) this.items.shift(); }
  all() { return [...this.items]; }
  clear() { this.items = []; }
}
export default LiveHistory;
