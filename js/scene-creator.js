export function createScene(name="New Scene"){return{id:`scene-${Date.now()}`,name,layout:{},content:{},behavior:{},theme:{},createdAt:Date.now(),updatedAt:Date.now()}}
export default createScene;
