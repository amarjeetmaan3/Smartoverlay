/**
 * Media bridge.
 */
import { liveMedia } from "../firebase/live-media.js";

export const mediaBridge = {
  async set(media) {
    return liveMedia.set(media);
  },
  async play(id = null) {
    return liveMedia.command("play", id);
  },
  async pause(id = null) {
    return liveMedia.command("pause", id);
  },
  async stop(id = null) {
    return liveMedia.command("stop", id);
  },
  async clear() {
    return liveMedia.command("clear");
  }
};

window.smartOverlayMediaBridge = mediaBridge;
