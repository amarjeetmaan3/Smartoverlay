/**
 * Question bridge.
 */
import { liveQuestion } from "../firebase/live-question.js";

export const questionBridge = {
  async show(question) {
    return liveQuestion.show(question);
  },
  async hide() {
    return liveQuestion.hide();
  },
  async set(question, visible = true) {
    return liveQuestion.set(question, visible);
  },
  subscribe(callback) {
    return liveQuestion.listen(callback);
  }
};

window.smartOverlayQuestionBridge = questionBridge;
