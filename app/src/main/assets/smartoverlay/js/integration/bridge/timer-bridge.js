/**
 * Timer bridge.
 */
import { liveTimer } from "../firebase/live-timer.js";

export const timerBridge = {
  async set(timer) {
    return liveTimer.set(timer);
  },
  async start(payload = {}) {
    return liveTimer.command("start", payload);
  },
  async pause() {
    return liveTimer.command("pause");
  },
  async resume() {
    return liveTimer.command("resume");
  },
  async stop() {
    return liveTimer.command("stop");
  },
  async reset() {
    return liveTimer.command("reset");
  },
  subscribe(callback) {
    return liveTimer.listen(callback);
  },
  subscribeCommands(callback) {
    return liveTimer.listenCommands(callback);
  }
};

window.smartOverlayTimerBridge = timerBridge;
