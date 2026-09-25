export function validateAnimation(animation = {}) {
  const errors = [];
  if (Number(animation.duration) < 0) errors.push("Duration cannot be negative");
  if (Number(animation.delay) < 0) errors.push("Delay cannot be negative");
  if (!Array.isArray(animation.keyframes) && animation.keyframes !== undefined) errors.push("Keyframes must be an array");
  return { valid: errors.length === 0, errors };
}
export default validateAnimation;
