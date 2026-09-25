/**
 * Overlay content renderer adapter.
 * Existing web-overlay renderer/engine remains the rendering authority.
 */
import { eventBus } from "../integration/event-bus.js";

let renderer = null;

export const overlayContent = {
  registerRenderer(fn) {
    renderer = typeof fn === "function" ? fn : null;
    return () => { renderer = null; };
  },

  render(content = {}) {
    if (renderer) return renderer(content);
    eventBus.emit("overlay:content", content);
    return content;
  },

  clear() {
    if (renderer) return renderer(null);
    eventBus.emit("overlay:content-clear");
  }
};

eventBus.on("overlay:state", state => {
  if (state?.content) overlayContent.render(state.content);
});

window.smartOverlayOverlayContent = overlayContent;
