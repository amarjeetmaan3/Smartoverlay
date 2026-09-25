export function normalizeAnswer(value) { return String(value ?? "").trim(); }
export function checkAnswer(question, answer) {
  return normalizeAnswer(question?.Answer).toLowerCase() === normalizeAnswer(answer).toLowerCase();
}
export default { normalizeAnswer, checkAnswer };
