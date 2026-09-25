export class QuizStateManager {
  constructor() { this.state = { active: false, mode: "manual", questionIndex: 0, timeRemaining: 0 }; }
  set(values = {}) { this.state = { ...this.state, ...values }; return this.get(); }
  start(values = {}) { return this.set({ ...values, active: true }); }
  reset() { this.state = { active: false, mode: "manual", questionIndex: 0, timeRemaining: 0 }; return this.get(); }
  get() { return { ...this.state }; }
}
export default QuizStateManager;
