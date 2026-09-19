export function quizToJSON(data) { return JSON.stringify(data, null, 2); }
export function quizToCSV(results = []) {
  const esc = v => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const header = ["Question", "User Answer", "Correct Answer", "Correct", "Skipped", "Marks"].join(",");
  const rows = results.map(r => [r.question?.Question, r.userAnswer, r.correctAnswer, r.correct, r.skipped, r.marks].map(esc).join(","));
  return [header, ...rows].join("\n");
}
export default quizToJSON;
