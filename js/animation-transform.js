export function normalizeTransform(value = {}) {
  return { x: Number(value.x) || 0, y: Number(value.y) || 0, scaleX: Number(value.scaleX ?? 1), scaleY: Number(value.scaleY ?? 1), rotation: Number(value.rotation) || 0 };
}
export default normalizeTransform;
