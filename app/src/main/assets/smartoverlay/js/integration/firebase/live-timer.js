import { liveChannel } from "./live-channel.js";

export const liveTimer = {
  async set(timer = {}) {
    return liveChannel.set("timer", {
      ...timer,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async command(type, payload = {}) {
    return liveChannel.set("timerCommand", {
      type,
      payload,
      createdAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("timer", callback);
  },
  listenCommands(callback) {
    return liveChannel.listen("timerCommand", callback);
  }
};

window.smartOverlayLiveTimer = liveTimer;
