export function opacityKeyframe(value = 1) { return { opacity: Math.max(0, Math.min(1, Number(value) || 0)) }; }
export default opacityKeyframe;
