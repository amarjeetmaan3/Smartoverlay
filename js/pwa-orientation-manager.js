export async function lockPWAOrientation(orientation = "landscape") {
  if (!screen.orientation?.lock) return false;
  try { await screen.orientation.lock(orientation); return true; }
  catch { return false; }
}
