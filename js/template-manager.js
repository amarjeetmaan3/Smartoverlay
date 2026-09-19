export class TemplateManager {
  constructor(){this.templates=new Map()}
  create(t={}){const id=t.id||`template-${Date.now()}`;const x={id,name:t.name||"New Template",scene:t.scene||{},...t};this.templates.set(id,x);return structuredClone(x)}
  get(id){const x=this.templates.get(id);return x?structuredClone(x):null}
  remove(id){this.templates.delete(id)}
  all(){return [...this.templates.values()].map(x=>structuredClone(x))}
}
export default TemplateManager;
