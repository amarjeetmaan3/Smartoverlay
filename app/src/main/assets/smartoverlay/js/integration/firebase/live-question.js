import { liveChannel } from "./live-channel.js";

export const liveQuestion = {
  async show(question) {
    return liveChannel.set("question", {
      visible: true,
      question,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async hide() {
    return liveChannel.update("question", {
      visible: false,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async set(question, visible = true) {
    return liveChannel.set("question", {
      visible,
      question,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("question", callback);
  }
};

window.smartOverlayLiveQuestion = liveQuestion;
