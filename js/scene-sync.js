export function normalizeSceneSync(scene = {}) {
  return { id: scene.id || "scene", name: scene.name || "Untitled", layout: scene.layout || {}, content: scene.content || {}, behavior: scene.behavior || {}, updatedAt: Date.now() };
}
export default normalizeSceneSync;
