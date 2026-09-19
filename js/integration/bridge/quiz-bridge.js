/**
 * Quiz bridge.
 */
import { liveQuiz } from "../firebase/live-quiz.js";

export const quizBridge = {
  async publish(state) {
    return liveQuiz.publish(state);
  },
  async start(payload = {}) {
    return liveQuiz.command("start", payload);
  },
  async submit(payload = {}) {
    return liveQuiz.command("submit", payload);
  },
  async reveal(payload = {}) {
    return liveQuiz.command("reveal", payload);
  },
  async reset() {
    return liveQuiz.command("reset");
  },
  subscribe(callback) {
    return liveQuiz.listen(callback);
  },
  subscribeCommands(callback) {
    return liveQuiz.listenCommands(callback);
  }
};

window.smartOverlayQuizBridge = quizBridge;
