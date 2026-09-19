/**
 * Live scene renderer adapter.
 */
import { eventBus } from "../integration/event-bus.js";

let renderer = null;

export const overlayScenes = {
  registerRenderer(fn) {
    renderer = typeof fn === "function" ? fn : null;
  },

  activate(scene) {
    if (renderer) return renderer(scene);
    eventBus.emit("overlay:scene", scene);
  }
};

eventBus.on("overlay:state", state => {
  if (state?.activeSceneId) {
    overlayScenes.activate({
      sceneId: state.activeSceneId,
      transition: state.transition || "cut"
    });
  }
});

eventBus.on("overlay:command", command => {
  if (command?.type === "scene:activate") {
    overlayScenes.activate(command.payload || {});
  }
});

window.smartOverlayOverlayScenes = overlayScenes;
