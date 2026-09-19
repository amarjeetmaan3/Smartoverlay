export class ThemeManager {
  constructor(){this.themes=new Map()}
  add(theme={}){const id=theme.id||`theme-${Date.now()}`;const x={id,name:theme.name||"Custom Theme",variables:theme.variables||{},...theme};this.themes.set(id,x);return structuredClone(x)}
  get(id){const x=this.themes.get(id);return x?structuredClone(x):null}
  apply(scene,id){const x=this.themes.get(id);if(!x||!scene)return null;scene.theme=structuredClone(x);return scene}
  all(){return [...this.themes.values()].map(x=>structuredClone(x))}
}
export default ThemeManager;
