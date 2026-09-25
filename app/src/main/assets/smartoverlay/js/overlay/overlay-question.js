/**
 * Live question renderer adapter.
 */
import { eventBus } from "../integration/event-bus.js";

let renderer = null;

export const overlayQuestion = {
  registerRenderer(fn) {
    renderer = typeof fn === "function" ? fn : null;
  },

  show(question) {
    if (renderer) return renderer({ visible: true, question });
    eventBus.emit("overlay:question-show", { question });
  },

  hide() {
    if (renderer) return renderer({ visible: false });
    eventBus.emit("overlay:question-hide");
  }
};

eventBus.on("overlay:state", state => {
  if (state?.question) {
    state.question.visible === false
      ? overlayQuestion.hide()
      : overlayQuestion.show(state.question.question ?? state.question);
  }
});

eventBus.on("overlay:command", command => {
  if (command?.type === "question:show") overlayQuestion.show(command.payload?.question);
  if (command?.type === "question:hide") overlayQuestion.hide();
});

window.smartOverlayOverlayQuestion = overlayQuestion;
