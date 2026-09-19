/**
 * Live timer controls.
 */
import { liveTimer } from "../integration/firebase/live-timer.js";

export const liveTimerControl = {
  set(timer) {
    return liveTimer.set(timer);
  },
  start(payload = {}) {
    return liveTimer.command("start", payload);
  },
  pause() {
    return liveTimer.command("pause");
  },
  resume() {
    return liveTimer.command("resume");
  },
  stop() {
    return liveTimer.command("stop");
  },
  reset() {
    return liveTimer.command("reset");
  },
  listen(callback) {
    return liveTimer.listen(callback);
  },
  listenCommands(callback) {
    return liveTimer.listenCommands(callback);
  }
};

window.smartOverlayLiveTimerControl = liveTimerControl;
