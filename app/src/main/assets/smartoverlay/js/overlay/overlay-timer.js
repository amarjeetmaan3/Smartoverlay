/**
 * Live timer renderer adapter.
 */
import { eventBus } from "../integration/event-bus.js";

let renderer = null;

export const overlayTimer = {
  registerRenderer(fn) {
    renderer = typeof fn === "function" ? fn : null;
  },

  render(timer) {
    if (renderer) return renderer(timer);
    eventBus.emit("overlay:timer", timer);
  },

  command(command) {
    eventBus.emit("overlay:timer-command", command);
  }
};

eventBus.on("overlay:state", state => {
  if (state?.timer) overlayTimer.render(state.timer);
});

eventBus.on("overlay:command", command => {
  if (command?.type?.startsWith("timer:")) overlayTimer.command(command);
});

window.smartOverlayOverlayTimer = overlayTimer;
