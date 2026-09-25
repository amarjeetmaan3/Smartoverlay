/**
 * SmartOverlay Phase 13D - Live Control Room
 * Coordinates live controls without replacing existing engines.
 */
import { eventBus } from "../integration/event-bus.js";
import { appState } from "../integration/app-state.js";
import { liveRuntime } from "../integration/live-runtime.js";

const controllers = new Map();

export const liveControlRoom = {
  register(name, controller) {
    if (!name || !controller) return () => {};
    controllers.set(name, controller);
    return () => controllers.delete(name);
  },

  get(name) {
    return controllers.get(name) || null;
  },

  list() {
    return [...controllers.keys()];
  },

  start(options = {}) {
    liveRuntime.connect(options);
    eventBus.emit("live-room:started", options);
    return appState.get();
  },

  stop() {
    liveRuntime.disconnected({ reason: "control-room-stopped" });
    eventBus.emit("live-room:stopped");
  },

  status() {
    return {
      connection: appState.getValue("connection"),
      live: appState.getValue("live"),
      sessionId: appState.getValue("sessionId"),
      overlayId: appState.getValue("overlayId")
    };
  }
};

window.smartOverlayLiveControlRoom = liveControlRoom;
