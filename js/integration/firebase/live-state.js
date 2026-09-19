import { liveChannel } from "./live-channel.js";

export const liveState = {
  async publish(state = {}) {
    return liveChannel.set("state", {
      ...state,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async patch(state = {}) {
    return liveChannel.update("state", {
      ...state,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("state", callback);
  },
  async get() {
    return liveChannel.get("state");
  }
};

window.smartOverlayLiveState = liveState;
