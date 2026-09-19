import { liveChannel } from "./live-channel.js";

export const liveMedia = {
  async set(media = null) {
    return liveChannel.set("media", {
      media,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async command(action, id = null, options = {}) {
    return liveChannel.set("mediaCommand", {
      action,
      id,
      options,
      createdAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("media", callback);
  },
  listenCommands(callback) {
    return liveChannel.listen("mediaCommand", callback);
  }
};

window.smartOverlayLiveMedia = liveMedia;
