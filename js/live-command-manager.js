export class LiveCommandManager {
  constructor() { this.commands = new Map(); }
  register(name, handler) { this.commands.set(name, handler); return () => this.commands.delete(name); }
  execute(name, payload) { const fn = this.commands.get(name); if (!fn) throw new Error("Unknown command: " + name); return fn(payload); }
}
export default LiveCommandManager;
