export function normalizeLayoutSync(layout = {}) {
  return { width: Number(layout.width) || 1920, height: Number(layout.height) || 1080, boxes: Array.isArray(layout.boxes) ? layout.boxes : [] };
}
export default normalizeLayoutSync;
