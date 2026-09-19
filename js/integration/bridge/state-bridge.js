/**
 * State bridge: central app state <-> Firebase live state.
 */
import { appState } from "../app-state.js";
import { eventBus } from "../event-bus.js";
import { liveState } from "../firebase/live-state.js";

let publishing = false;

export const stateBridge = {
  async publish(patch = {}) {
    appState.set(patch);
    publishing = true;
    try {
      return await liveState.patch(patch);
    } finally {
      publishing = false;
    }
  },

  subscribe() {
    return liveState.listen(remote => {
      if (publishing || !remote) return;
      appState.set(remote);
      eventBus.emit("bridge:remote-state", remote);
    });
  },

  getLocal() {
    return appState.get();
  }
};

window.smartOverlayStateBridge = stateBridge;
