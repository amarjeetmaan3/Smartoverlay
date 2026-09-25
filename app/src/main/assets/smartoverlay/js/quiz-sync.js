export function createQuizState(data = {}) {
  return { questionIndex: Number(data.questionIndex) || 0, score: Number(data.score) || 0, attempted: Number(data.attempted) || 0, ...data, updatedAt: Date.now() };
}
export default createQuizState;
