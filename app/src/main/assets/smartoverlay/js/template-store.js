export class TemplateStore {
  constructor(){this.items=new Map()}
  set(id,t){this.items.set(id,structuredClone(t));return this.get(id)}
  get(id){const x=this.items.get(id);return x?structuredClone(x):null}
  delete(id){return this.items.delete(id)}
  all(){return [...this.items.values()].map(x=>structuredClone(x))}
}
export default TemplateStore;
