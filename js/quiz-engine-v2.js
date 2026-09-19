export class QuizEngineV2 {
  constructor(questions = []) {
    this.questions = questions;
    this.index = 0;
    this.results = [];
    this.config = { mode: "manual", timerSeconds: 0, marksPerQuestion: 1, negativeMarks: 0 };
  }
  configure(config = {}) { this.config = { ...this.config, ...config }; return this.config; }
  start() { this.index = 0; this.results = []; return this.current(); }
  current() { return this.questions[this.index] || null; }
  submit(answer) {
    const q = this.current();
    if (!q) return null;
    const correct = String(answer ?? "").trim().toLowerCase() === String(q.Answer ?? "").trim().toLowerCase();
    const skipped = String(answer ?? "").trim() === "";
    const marks = skipped ? 0 : correct ? Number(this.config.marksPerQuestion) : -Number(this.config.negativeMarks);
    const result = { question: q, userAnswer: answer ?? "", correctAnswer: q.Answer ?? "", correct, skipped, marks };
    this.results[this.index] = result;
    return result;
  }
  next() { if (this.index < this.questions.length - 1) this.index++; return this.current(); }
  previous() { if (this.index > 0) this.index--; return this.current(); }
  stats() {
    const r = this.results.filter(Boolean);
    const attempted = r.filter(x => !x.skipped).length;
    const correct = r.filter(x => x.correct).length;
    const wrong = r.filter(x => !x.correct && !x.skipped).length;
    const skipped = r.filter(x => x.skipped).length;
    const score = r.reduce((s, x) => s + Number(x.marks || 0), 0);
    return { total: this.questions.length, attempted, remaining: this.questions.length - r.length, correct, wrong, skipped, score,
      accuracy: attempted ? correct / attempted * 100 : 0 };
  }
}
export default QuizEngineV2;
