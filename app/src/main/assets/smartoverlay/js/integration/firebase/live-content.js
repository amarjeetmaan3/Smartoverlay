import { liveChannel } from "./live-channel.js";

export const liveContent = {
  async publish(content = {}) {
    return liveChannel.set("content", {
      ...content,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async patch(content = {}) {
    return liveChannel.update("content", {
      ...content,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("content", callback);
  }
};

window.smartOverlayLiveContent = liveContent;
