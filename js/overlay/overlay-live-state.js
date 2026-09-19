/**
 * Firebase live-state listener for the universal overlay.
 */
import { appState } from "../integration/app-state.js";
import { liveState } from "../integration/firebase/live-state.js";
import { liveCommands } from "../integration/firebase/live-commands.js";
import { eventBus } from "../integration/event-bus.js";

let unsubscribeState = null;
let unsubscribeCommands = null;

function safeState(value) {
  return value && typeof value === "object" ? value : {};
}

export const overlayLiveState = {
  start() {
    this.stop();

    unsubscribeState = liveState.listen(state => {
      const next = safeState(state);
      appState.set(next);
      eventBus.emit("overlay:state", next);
    });

    unsubscribeCommands = liveCommands.listen(commands => {
      if (!commands || typeof commands !== "object") return;
      Object.values(commands).forEach(command => {
        eventBus.emit("overlay:command", command);
      });
    });

    return this;
  },

  stop() {
    if (typeof unsubscribeState === "function") unsubscribeState();
    if (typeof unsubscribeCommands === "function") unsubscribeCommands();
    unsubscribeState = null;
    unsubscribeCommands = null;
  }
};

window.smartOverlayOverlayLiveState = overlayLiveState;
