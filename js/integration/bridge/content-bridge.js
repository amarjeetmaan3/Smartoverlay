/**
 * Generic content bridge.
 */
import { liveCommands } from "../firebase/live-commands.js";

export const contentBridge = {
  async set(content = {}) {
    return liveCommands.send("content:set", content);
  },
  async patch(content = {}) {
    return liveCommands.send("content:patch", content);
  },
  async clear() {
    return liveCommands.send("content:clear");
  }
};

window.smartOverlayContentBridge = contentBridge;
