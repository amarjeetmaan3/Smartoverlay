export const ANIMATION_PRESETS = {
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 }, duration: 500 },
  fadeOut: { from: { opacity: 1 }, to: { opacity: 0 }, duration: 500 },
  slideLeft: { from: { x: 100 }, to: { x: 0 }, duration: 600 },
  slideRight: { from: { x: -100 }, to: { x: 0 }, duration: 600 },
  scaleIn: { from: { scaleX: 0, scaleY: 0 }, to: { scaleX: 1, scaleY: 1 }, duration: 500 },
  rotateIn: { from: { rotation: -180, opacity: 0 }, to: { rotation: 0, opacity: 1 }, duration: 700 }
};
export function getAnimationPreset(name) { return ANIMATION_PRESETS[name] ? { ...ANIMATION_PRESETS[name] } : null; }
export default ANIMATION_PRESETS;
