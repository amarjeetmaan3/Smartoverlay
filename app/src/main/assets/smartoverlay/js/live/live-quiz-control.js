/**
 * Live quiz controls.
 */
import { liveQuiz } from "../integration/firebase/live-quiz.js";

export const liveQuizControl = {
  publish(state) {
    return liveQuiz.publish(state);
  },
  start(payload = {}) {
    return liveQuiz.command("start", payload);
  },
  submit(payload = {}) {
    return liveQuiz.command("submit", payload);
  },
  reveal(payload = {}) {
    return liveQuiz.command("reveal", payload);
  },
  reset() {
    return liveQuiz.command("reset");
  },
  listen(callback) {
    return liveQuiz.listen(callback);
  },
  listenCommands(callback) {
    return liveQuiz.listenCommands(callback);
  }
};

window.smartOverlayLiveQuizControl = liveQuizControl;
