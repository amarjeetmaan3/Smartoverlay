export function updateScene(scene,patch={}){if(!scene)return null;Object.assign(scene,patch);scene.updatedAt=Date.now();return scene}
export default updateScene;
