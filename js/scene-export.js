export function exportScene(scene){return JSON.stringify(scene,null,2)}
export function exportSceneBlob(scene){return new Blob([exportScene(scene)],{type:"application/json"})}
export default exportScene;
