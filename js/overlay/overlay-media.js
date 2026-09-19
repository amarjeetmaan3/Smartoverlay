/**
 * Live media renderer adapter.
 */
import { eventBus } from "../integration/event-bus.js";

let renderer = null;

export const overlayMedia = {
  registerRenderer(fn) {
    renderer = typeof fn === "function" ? fn : null;
  },

  set(media) {
    if (renderer) return renderer(media);
    eventBus.emit("overlay:media", media);
  },

  command(command) {
    eventBus.emit("overlay:media-command", command);
  }
};

eventBus.on("overlay:state", state => {
  if (state?.media) overlayMedia.set(state.media);
});

eventBus.on("overlay:command", command => {
  if (command?.type?.startsWith("media:")) overlayMedia.command(command);
});

window.smartOverlayOverlayMedia = overlayMedia;
