export class QuizDisplayManager {
  constructor() { this.flags = { question: true, options: true, answer: false, explanation: false, timer: true, score: true, stats: true, progress: true }; }
  set(values = {}) { Object.assign(this.flags, values); return this.get(); }
  toggle(name) { if (name in this.flags) this.flags[name] = !this.flags[name]; return this.flags[name]; }
  get() { return { ...this.flags }; }
}
export default QuizDisplayManager;
