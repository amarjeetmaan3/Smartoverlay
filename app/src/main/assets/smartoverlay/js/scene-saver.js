export function serializeScene(scene={}){return JSON.stringify({...scene,updatedAt:Date.now()},null,2)}
export default serializeScene;
