export const EASINGS = ["linear","ease","ease-in","ease-out","ease-in-out","step-start","step-end"];
export function normalizeEasing(value) { return EASINGS.includes(value) ? value : "linear"; }
export default normalizeEasing;
