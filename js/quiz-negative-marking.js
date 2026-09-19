export function calculateNegativeMarks(wrongCount, negativePerWrong) {
  return Math.max(0, Number(wrongCount) || 0) * Math.max(0, Number(negativePerWrong) || 0);
}
export default calculateNegativeMarks;
