import { liveChannel } from "./live-channel.js";

export const liveQuiz = {
  async publish(state = {}) {
    return liveChannel.set("quiz", {
      ...state,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async command(type, payload = {}) {
    return liveChannel.set("quizCommand", {
      type,
      payload,
      createdAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("quiz", callback);
  },
  listenCommands(callback) {
    return liveChannel.listen("quizCommand", callback);
  }
};

window.smartOverlayLiveQuiz = liveQuiz;
