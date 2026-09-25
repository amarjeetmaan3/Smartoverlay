export class QuizSession {
  constructor(questions = []) { this.questions = [...questions]; this.index = 0; this.answers = {}; }
  current() { return this.questions[this.index] || null; }
  start() { this.index = 0; this.answers = {}; return this.current(); }
  next() { if (this.index < this.questions.length - 1) this.index++; return this.current(); }
  previous() { if (this.index > 0) this.index--; return this.current(); }
  goTo(index) { this.index = Math.max(0, Math.min(this.questions.length - 1, Number(index) || 0)); return this.current(); }
  record(value) { this.answers[this.index] = value; return value; }
}
export default QuizSession;
