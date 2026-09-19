export const QUIZ_MODES = ["manual", "practice", "test", "hybrid"];
export class QuizModeManager {
  constructor(mode = "manual") { this.mode = QUIZ_MODES.includes(mode) ? mode : "manual"; }
  set(mode) { if (QUIZ_MODES.includes(mode)) this.mode = mode; return this.mode; }
  get() { return this.mode; }
  isTest() { return this.mode === "test"; }
}
export default QuizModeManager;
