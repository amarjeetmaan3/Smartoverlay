/**
 * SmartOverlay Phase 13C - Controller <-> Overlay bridge.
 * Coordinates local integration events with Firebase live modules.
 */
import { eventBus } from "../event-bus.js";
import { appState } from "../app-state.js";
import { liveState } from "../firebase/live-state.js";
import { liveCommands } from "../firebase/live-commands.js";

let started = false;
let unsubscribers = [];

export const controllerOverlayBridge = {
  start(options = {}) {
    if (started) return this;
    started = true;

    if (options.listenState !== false) {
      const off = liveState.listen(state => {
        appState.set(state && typeof state === "object" ? state : {});
        eventBus.emit("bridge:state", state);
      });
      if (typeof off === "function") unsubscribers.push(off);
    }

    eventBus.on("bridge:command", ({ type, payload } = {}) => {
      if (type) liveCommands.send(type, payload).catch(console.error);
    });

    eventBus.emit("bridge:started", options);
    return this;
  },

  async publishState(state) {
    return liveState.publish(state || {});
  },

  async patchState(state) {
    return liveState.patch(state || {});
  },

  async command(type, payload = {}) {
    return liveCommands.send(type, payload);
  },

  stop() {
    unsubscribers.forEach(off => {
      try { off(); } catch (_) {}
    });
    unsubscribers = [];
    started = false;
    eventBus.emit("bridge:stopped");
  },

  isStarted() {
    return started;
  }
};

window.smartOverlayControllerOverlayBridge = controllerOverlayBridge;
