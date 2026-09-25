export function calculateQuizStats(results = [], total = results.length) {
  const attempted = results.filter(x => !x.skipped).length;
  const correct = results.filter(x => x.correct).length;
  const wrong = results.filter(x => !x.correct && !x.skipped).length;
  const skipped = results.filter(x => x.skipped).length;
  const score = results.reduce((s, x) => s + Number(x.marks || 0), 0);
  return { total, attempted, remaining: Math.max(0, total - results.length), correct, wrong, skipped, score,
    accuracy: attempted ? correct / attempted * 100 : 0 };
}
export default calculateQuizStats;
