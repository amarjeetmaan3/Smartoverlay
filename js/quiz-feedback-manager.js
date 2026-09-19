export function getQuizFeedback(result) {
  if (!result) return { type: "none", message: "" };
  if (result.skipped) return { type: "skipped", message: "Skipped" };
  return result.correct ? { type: "correct", message: "Correct" } : { type: "wrong", message: "Wrong" };
}
export default getQuizFeedback;
