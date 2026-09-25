export function validateSyncPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== "object") errors.push("Payload must be an object");
  if (payload && payload.type !== undefined && typeof payload.type !== "string") errors.push("Event type must be a string");
  return { valid: errors.length === 0, errors };
}
export default validateSyncPayload;
