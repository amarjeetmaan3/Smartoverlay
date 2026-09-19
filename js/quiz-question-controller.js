export function getCurrentQuestion(session) { return session?.current?.() || null; }
export function goToQuestion(session, index) { return session?.goTo?.(index) || null; }
export default { getCurrentQuestion, goToQuestion };
