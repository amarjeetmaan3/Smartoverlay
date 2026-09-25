export class SceneManagerV2 {
  constructor(){this.items=new Map();this.active=null}
  create(data={}){const id=data.id||`scene-${Date.now()}`;const x={id,name:data.name||"New Scene",layout:data.layout||{},content:data.content||{},behavior:data.behavior||{},theme:data.theme||{},updatedAt:Date.now()};this.items.set(id,x);this.active=id;return this.get(id)}
  get(id=this.active){const x=this.items.get(id);return x?structuredClone(x):null}
  update(id,patch={}){const x=this.items.get(id);if(!x)return null;Object.assign(x,patch,{updatedAt:Date.now()});return this.get(id)}
  remove(id){this.items.delete(id);if(this.active===id)this.active=null}
  list(){return [...this.items.values()].map(x=>structuredClone(x))}
}
export default SceneManagerV2;
