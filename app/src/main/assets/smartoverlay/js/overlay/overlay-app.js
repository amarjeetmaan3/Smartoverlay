/**
 * SmartOverlay Phase 13F - Final Overlay Integration
 * Starts the universal web overlay runtime and binds Firebase live state.
 */
import { eventBus } from "../integration/event-bus.js";
import { appState } from "../integration/app-state.js";
import { overlayRuntime } from "../integration/overlay-runtime.js";
import { overlayLiveState } from "./overlay-live-state.js";

let started = false;

export const overlayApp = {
  start(options = {}) {
    if (started) return this;
    started = true;

    overlayRuntime.start({
      sessionId: options.sessionId ?? null,
      overlayId: options.overlayId ?? null
    });

    overlayLiveState.start(options);

    eventBus.emit("overlay-app:started", options);
    window.dispatchEvent(new CustomEvent("smartoverlay:overlay-ready", {
      detail: appState.get()
    }));
    return this;
  },

  stop() {
    if (!started) return;
    overlayLiveState.stop();
    overlayRuntime.stop();
    started = false;
    eventBus.emit("overlay-app:stopped");
  },

  state() {
    return appState.get();
  }
};

window.smartOverlayOverlayApp = overlayApp;
