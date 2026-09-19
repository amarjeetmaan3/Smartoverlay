export class QuizScoreManager {
  constructor(config = {}) { this.results = []; this.configure(config); }
  configure({ marksPerQuestion = 1, negativeMarks = 0 } = {}) {
    this.marksPerQuestion = Number(marksPerQuestion) || 0; this.negativeMarks = Math.max(0, Number(negativeMarks) || 0);
  }
  evaluate(question, answer) {
    const correct = String(question?.Answer ?? "").trim().toLowerCase() === String(answer ?? "").trim().toLowerCase();
    const skipped = String(answer ?? "").trim() === "";
    return { correct, skipped, userAnswer: answer ?? "", correctAnswer: question?.Answer ?? "",
      marks: skipped ? 0 : correct ? this.marksPerQuestion : -this.negativeMarks };
  }
  add(result) { this.results.push(result); return result; }
  stats(total = this.results.length) {
    const attempted = this.results.filter(x => !x.skipped).length;
    const correct = this.results.filter(x => x.correct).length;
    const wrong = this.results.filter(x => !x.correct && !x.skipped).length;
    const skipped = this.results.filter(x => x.skipped).length;
    const score = this.results.reduce((s, x) => s + Number(x.marks || 0), 0);
    return { total, attempted, remaining: Math.max(0, total - this.results.length), correct, wrong, skipped, score,
      negativeMarks: this.results.reduce((s, x) => s + (x.marks < 0 ? -x.marks : 0), 0),
      accuracy: attempted ? correct / attempted * 100 : 0 };
  }
}
export default QuizScoreManager;
