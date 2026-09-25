const KEY = "smartOverlay.live.sync";
export function saveSyncState(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch { return false; } }
export function loadSyncState() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } }
export function clearSyncState() { try { localStorage.removeItem(KEY); } catch {} }
export default { saveSyncState, loadSyncState, clearSyncState };
