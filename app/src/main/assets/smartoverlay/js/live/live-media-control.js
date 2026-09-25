/**
 * Live media controls.
 */
import { liveMedia } from "../integration/firebase/live-media.js";

export const liveMediaControl = {
  set(media) {
    return liveMedia.set(media);
  },
  play(id = null) {
    return liveMedia.command("play", id);
  },
  pause(id = null) {
    return liveMedia.command("pause", id);
  },
  stop(id = null) {
    return liveMedia.command("stop", id);
  },
  clear() {
    return liveMedia.command("clear");
  },
  listen(callback) {
    return liveMedia.listen(callback);
  },
  listenCommands(callback) {
    return liveMedia.listenCommands(callback);
  }
};

window.smartOverlayLiveMediaControl = liveMediaControl;
