/* SmartOverlay Phase 2 - Editor Core */
import CanvasManager from "./canvas-manager.js";
import BoxSystem from "./box-system.js";
import BoxRenderer from "./box-renderer.js";
import BoxSelection from "./box-selection.js";
import GridManager from "./grid-manager.js";
import ClipboardManager from "./clipboard-manager.js";
import EditorHistory from "./editor-history.js";

export class EditorCore{
  constructor(canvas){
    this.canvas=canvas;
    this.canvasManager=new CanvasManager(canvas);
    this.boxSystem=new BoxSystem(canvas);
    this.renderer=new BoxRenderer(canvas);
    this.selection=new BoxSelection();
    this.grid=new GridManager(canvas);
    this.clipboard=new ClipboardManager();
    this.history=new EditorHistory();
    canvas.addEventListener("smartoverlay:box-create",e=>this.renderer.render(e.detail));
    canvas.addEventListener("smartoverlay:box-update",e=>this.renderer.render(e.detail));
    canvas.addEventListener("smartoverlay:box-remove",e=>this.renderer.remove(e.detail.id));
    canvas.addEventListener("smartoverlay:box-import",()=>this.syncRender());
  }
  addBox(data={}){const b=this.boxSystem.create(data);this.renderer.render(b);this.selection.select(b.id);return b}
  update(id,data){const b=this.boxSystem.update(id,data);if(b)this.renderer.render(b);return b}
  remove(id){return this.boxSystem.remove(id)}
  syncRender(){this.renderer.clear();this.boxSystem.all().forEach(b=>this.renderer.render(b))}
  export(){return this.boxSystem.export()}
  import(data){this.boxSystem.import(data);this.syncRender()}
}
export default EditorCore;
