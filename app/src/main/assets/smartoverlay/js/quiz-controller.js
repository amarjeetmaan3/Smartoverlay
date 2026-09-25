export class QuizController {
  constructor(engine) { this.engine = engine; }
  start(options) { return this.engine.start(options); }
  answer(value) { return this.engine.submit(value); }
  next() { return this.engine.next(); }
  previous() { return this.engine.previous(); }
  stats() { return this.engine.stats(); }
}
export default QuizController;
