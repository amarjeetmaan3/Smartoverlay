export function applyTemplate(target,template={}){if(!target||!template)return null;const scene=structuredClone(template.scene||template);if(typeof target.loadScene==="function")target.loadScene(scene);else Object.assign(target,scene);return scene}
export default applyTemplate;
