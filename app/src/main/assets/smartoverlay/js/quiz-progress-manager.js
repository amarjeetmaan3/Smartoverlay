export function getQuizProgress(index, total) {
  const t = Math.max(0, Number(total) || 0);
  return { current: t ? index + 1 : 0, total: t, percent: t ? Math.min(100, (index + 1) / t * 100) : 0 };
}
export default getQuizProgress;
