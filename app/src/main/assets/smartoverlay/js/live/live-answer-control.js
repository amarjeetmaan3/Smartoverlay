/**
 * Live answer controls.
 */
import { liveCommands } from "../integration/firebase/live-commands.js";

export const liveAnswerControl = {
  async show(answer, options = {}) {
    return liveCommands.send("answer:show", { answer, ...options });
  },
  async hide() {
    return liveCommands.send("answer:hide");
  },
  async set(answer, visible = true) {
    return liveCommands.send("answer:set", { answer, visible });
  }
};

window.smartOverlayLiveAnswerControl = liveAnswerControl;
