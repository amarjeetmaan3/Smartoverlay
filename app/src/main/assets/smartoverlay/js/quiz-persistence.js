const KEY = "smartOverlay.quiz.state";
export function saveQuizState(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; } }
export function loadQuizState() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } }
export function clearQuizState() { try { localStorage.removeItem(KEY); } catch {} }
export default { saveQuizState, loadQuizState, clearQuizState };
