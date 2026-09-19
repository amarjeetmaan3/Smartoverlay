export function createContentPatch(path, value) { return { path: String(path), value, timestamp: Date.now() }; }
export default createContentPatch;
