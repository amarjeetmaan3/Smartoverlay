import LiveSyncEngineV2 from "./live-sync-engine-v2.js";
export class LiveEngine {
  constructor() { this.sync = new LiveSyncEngineV2(); }
  start(sessionId) { return this.sync.connect(sessionId); }
  stop() { this.sync.disconnect(); }
  on(event, callback) { return this.sync.on(event, callback); }
  state() { return this.sync.state(); }
}
export default LiveEngine;
