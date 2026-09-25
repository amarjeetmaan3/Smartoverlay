/**
 * Live preview synchronization helper.
 */
import { liveState } from "../integration/firebase/live-state.js";
import { appState } from "../integration/app-state.js";

let unsubscribe = null;

export const livePreview = {
  start(callback) {
    this.stop();
    unsubscribe = liveState.listen(state => {
      appState.set(state && typeof state === "object" ? state : {});
      if (typeof callback === "function") callback(state);
    });
    return unsubscribe;
  },

  stop() {
    if (typeof unsubscribe === "function") unsubscribe();
    unsubscribe = null;
  },

  getState() {
    return appState.get();
  }
};

window.smartOverlayLivePreview = livePreview;
