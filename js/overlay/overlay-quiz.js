/**
 * Live quiz renderer adapter.
 */
import { eventBus } from "../integration/event-bus.js";

let renderer = null;

export const overlayQuiz = {
  registerRenderer(fn) {
    renderer = typeof fn === "function" ? fn : null;
  },

  render(state) {
    if (renderer) return renderer(state);
    eventBus.emit("overlay:quiz", state);
  }
};

eventBus.on("overlay:state", state => {
  if (state?.quiz) overlayQuiz.render(state.quiz);
});

eventBus.on("overlay:command", command => {
  if (command?.type?.startsWith("quiz:")) {
    eventBus.emit("overlay:quiz-command", command);
  }
});

window.smartOverlayOverlayQuiz = overlayQuiz;
