export function renameScene(scene,name){if(!scene)return null;scene.name=String(name||"Untitled Scene").trim()||"Untitled Scene";scene.updatedAt=Date.now();return scene}
export default renameScene;
