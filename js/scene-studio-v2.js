export class SceneStudioV2 {
  constructor(){this.scenes=new Map();this.activeId=null}
  create(scene={}){const id=scene.id||`scene-${Date.now()}`;const x={id,name:scene.name||"Untitled Scene",layout:{},content:{},behavior:{},theme:{},...scene};this.scenes.set(id,x);this.activeId=id;return this.get(id)}
  get(id=this.activeId){const x=this.scenes.get(id);return x?structuredClone(x):null}
  setActive(id){if(!this.scenes.has(id))return false;this.activeId=id;return true}
  all(){return [...this.scenes.values()].map(x=>structuredClone(x))}
}
export default SceneStudioV2;
