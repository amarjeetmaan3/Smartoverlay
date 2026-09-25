/**
 * Live scene controls.
 */
import { liveScenes } from "../integration/firebase/live-scenes.js";

export const liveSceneControl = {
  activate(sceneId, transition = "cut") {
    return liveScenes.activate(sceneId, transition);
  },
  listen(callback) {
    return liveScenes.listen(callback);
  },
  clear() {
    return liveScenes.activate(null, "cut");
  }
};

window.smartOverlayLiveSceneControl = liveSceneControl;
