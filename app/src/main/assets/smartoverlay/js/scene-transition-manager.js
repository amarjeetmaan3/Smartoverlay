export const SCENE_TRANSITIONS=["cut","fade","slide-left","slide-right","slide-up","slide-down","zoom"];
export function normalizeTransition(v){return SCENE_TRANSITIONS.includes(v)?v:"cut"}
export default normalizeTransition;
