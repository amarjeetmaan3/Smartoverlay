export function loadScene(target,scene={}){if(!target||!scene)return false;if(typeof target.loadScene==="function"){target.loadScene(scene);return true}Object.assign(target,scene);return true}
export default loadScene;
