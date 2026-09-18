/* SmartOverlay Phase 2 - Box System */
export class BoxSystem{
  constructor(canvas){this.canvas=canvas;this.boxes=new Map()}
  create(data={}){const id=data.id||"box_"+Date.now()+"_"+Math.random().toString(36).slice(2,7);const box={id,x:0,y:0,width:300,height:100,rotation:0,opacity:1,zIndex:this.boxes.size+1,visible:true,locked:false,type:"text",content:"",...data};this.boxes.set(id,box);this.emit("create",box);return box}
  get(id){return this.boxes.get(id)}
  update(id,data){const b=this.get(id);if(!b)return null;Object.assign(b,data);this.emit("update",b);return b}
  remove(id){const b=this.get(id);if(!b)return false;this.boxes.delete(id);this.emit("remove",b);return true}
  all(){return [...this.boxes.values()]}
  emit(action,box){this.canvas.dispatchEvent(new CustomEvent("smartoverlay:box-"+action,{detail:box}))}
  export(){return this.all().map(b=>({...b}))}
  import(items=[]){this.boxes.clear();items.forEach(b=>this.boxes.set(b.id,{...b}));this.emit("import",this.all())}
}
export default BoxSystem;
