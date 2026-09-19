export class SceneStore {
  constructor(){this.data=new Map()}
  set(id,scene){this.data.set(id,structuredClone(scene));return this.get(id)}
  get(id){const x=this.data.get(id);return x?structuredClone(x):null}
  delete(id){return this.data.delete(id)}
  all(){return [...this.data.values()].map(x=>structuredClone(x))}
}
export default SceneStore;
