export function validateQuizConfig(config = {}) {
  const errors = [];
  if (!Array.isArray(config.questions) || !config.questions.length) errors.push("At least one question is required");
  if (Number(config.timerSeconds) < 0) errors.push("Timer cannot be negative");
  if (Number(config.marksPerQuestion) < 0) errors.push("Marks cannot be negative");
  if (Number(config.negativeMarks) < 0) errors.push("Negative marks cannot be negative");
  return { valid: errors.length === 0, errors };
}
export default validateQuizConfig;
