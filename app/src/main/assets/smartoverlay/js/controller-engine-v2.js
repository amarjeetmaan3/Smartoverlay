import { createControllerShell } from "./controller-shell.js";
import { createControllerRouter } from "./controller-router.js";
import { createControllerState } from "./controller-state-manager.js";

export function createSmartOverlayController(options = {}) {
  const root = options.root || document.querySelector("#smartOverlayController") || document.body;
  const state = createControllerState(options.initialState || {});
  const router = createControllerRouter();
  const shell = createControllerShell(root, { state, router });

  const api = { root, state, router, shell };
  window.smartOverlayController = api;
  window.dispatchEvent(new CustomEvent("smartoverlay:controller-ready", { detail: api }));
  return api;
}

window.createSmartOverlayController = createSmartOverlayController;
