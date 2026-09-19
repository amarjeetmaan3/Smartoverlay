export async function enterPWAFullscreen(element = document.documentElement) {
  if (!element.requestFullscreen) return false;
  try { await element.requestFullscreen(); return true; }
  catch { return false; }
}
export async function exitPWAFullscreen() {
  if (!document.exitFullscreen) return false;
  try { await document.exitFullscreen(); return true; }
  catch { return false; }
}
