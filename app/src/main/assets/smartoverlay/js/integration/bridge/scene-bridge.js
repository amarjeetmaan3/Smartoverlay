/**
 * Scene bridge.
 */
import { liveScenes } from "../firebase/live-scenes.js";

export const sceneBridge = {
  async activate(sceneId, transition = "cut") {
    return liveScenes.activate(sceneId, transition);
  },
  async clear() {
    return liveScenes.activate(null, "cut");
  },
  subscribe(callback) {
    return liveScenes.listen(callback);
  }
};

window.smartOverlaySceneBridge = sceneBridge;
