export function buildQuizResult(stats = {}) {
  return { total: Number(stats.total || 0), attempted: Number(stats.attempted || 0),
    correct: Number(stats.correct || 0), wrong: Number(stats.wrong || 0),
    skipped: Number(stats.skipped || 0), score: Number(stats.score || 0),
    accuracy: Number(stats.accuracy || 0) };
}
export default buildQuizResult;
