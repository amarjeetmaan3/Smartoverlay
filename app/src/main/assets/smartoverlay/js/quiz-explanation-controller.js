export function getExplanation(question) { return question?.Explanation ?? ""; }
export function hasExplanation(question) { return Boolean(getExplanation(question).trim()); }
export default { getExplanation, hasExplanation };
