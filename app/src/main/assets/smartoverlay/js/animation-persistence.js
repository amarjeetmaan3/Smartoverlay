const KEY = "smartOverlay.animation.state";
export function saveAnimationState(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; } }
export function loadAnimationState() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } }
export function clearAnimationState() { try { localStorage.removeItem(KEY); } catch {} }
export default { saveAnimationState, loadAnimationState, clearAnimationState };
