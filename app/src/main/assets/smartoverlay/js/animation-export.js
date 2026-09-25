export function exportAnimation(data) { return JSON.stringify(data, null, 2); }
export function exportAnimationBlob(data) { return new Blob([exportAnimation(data)], { type: "application/json" }); }
export default exportAnimation;
