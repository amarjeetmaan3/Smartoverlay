export function createAnimationPatch(boxId, animation) {
  return { boxId, animation: animation || {}, timestamp: Date.now() };
}
export default createAnimationPatch;
