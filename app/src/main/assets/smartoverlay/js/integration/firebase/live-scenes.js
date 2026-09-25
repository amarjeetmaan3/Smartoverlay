import { liveChannel } from "./live-channel.js";

export const liveScenes = {
  async activate(sceneId, transition = "cut") {
    return liveChannel.update("scene", {
      activeSceneId: sceneId ?? null,
      transition,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("scene", callback);
  },
  async get() {
    return liveChannel.get("scene");
  }
};

window.smartOverlayLiveScenes = liveScenes;
