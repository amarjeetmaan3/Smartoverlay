/**
 * Layout bridge for canvas/layout changes.
 */
import { eventBus } from "../event-bus.js";
import { liveCommands } from "../firebase/live-commands.js";

export const layoutBridge = {
  async publish(layout = {}) {
    return liveCommands.send("layout:update", layout);
  },
  async selectBox(boxId) {
    return liveCommands.send("layout:select", { boxId: boxId ?? null });
  },
  async clear() {
    return liveCommands.send("layout:clear");
  },
  bind() {
    return eventBus.on("editor:changed", payload => {
      this.publish(payload).catch(console.error);
    });
  }
};

window.smartOverlayLayoutBridge = layoutBridge;
