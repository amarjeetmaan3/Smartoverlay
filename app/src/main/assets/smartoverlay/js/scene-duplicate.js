export function duplicateScene(scene,name){if(!scene)return null;const x=structuredClone(scene);x.id=`scene-${Date.now()}`;x.name=name||`${scene.name||"Scene"} Copy`;x.updatedAt=Date.now();return x}
export default duplicateScene;
