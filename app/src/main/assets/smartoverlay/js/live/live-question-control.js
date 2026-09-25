/**
 * Live question controls.
 */
import { liveQuestion } from "../integration/firebase/live-question.js";

export const liveQuestionControl = {
  show(question) {
    return liveQuestion.show(question);
  },
  set(question, visible = true) {
    return liveQuestion.set(question, visible);
  },
  hide() {
    return liveQuestion.hide();
  },
  listen(callback) {
    return liveQuestion.listen(callback);
  }
};

window.smartOverlayLiveQuestionControl = liveQuestionControl;
