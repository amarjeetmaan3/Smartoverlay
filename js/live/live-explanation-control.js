/**
 * Live explanation controls.
 */
import { liveCommands } from "../integration/firebase/live-commands.js";

export const liveExplanationControl = {
  async show(explanation, options = {}) {
    return liveCommands.send("explanation:show", { explanation, ...options });
  },
  async hide() {
    return liveCommands.send("explanation:hide");
  },
  async set(explanation, visible = true) {
    return liveCommands.send("explanation:set", { explanation, visible });
  }
};

window.smartOverlayLiveExplanationControl = liveExplanationControl;
