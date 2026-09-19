/**
 * Common live actions.
 */
import { liveCommands } from "../integration/firebase/live-commands.js";

export const liveActions = {
  async clearOverlay() {
    return liveCommands.send("overlay:clear");
  },

  async showOverlay() {
    return liveCommands.send("overlay:show");
  },

  async hideOverlay() {
    return liveCommands.send("overlay:hide");
  },

  async refreshOverlay() {
    return liveCommands.send("overlay:refresh");
  },

  async send(type, payload = {}) {
    return liveCommands.send(type, payload);
  }
};

window.smartOverlayLiveActions = liveActions;
