export function createQuestionState(data = {}) {
  return { current: Number(data.current) || 0, question: data.question || null, answerVisible: Boolean(data.answerVisible), explanationVisible: Boolean(data.explanationVisible), updatedAt: Date.now() };
}
export default createQuestionState;
