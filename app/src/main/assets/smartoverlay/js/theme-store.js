export class ThemeStore {
  constructor(){this.items=new Map()}
  set(id,theme){this.items.set(id,structuredClone(theme));return this.get(id)}
  get(id){const x=this.items.get(id);return x?structuredClone(x):null}
  delete(id){return this.items.delete(id)}
  all(){return [...this.items.values()].map(x=>structuredClone(x))}
}
export default ThemeStore;
