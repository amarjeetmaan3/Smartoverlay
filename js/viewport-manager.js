/* SmartOverlay Phase 2 - Viewport Manager */
export class ViewportManager{
  constructor(viewport,canvas){this.viewport=viewport;this.canvas=canvas;this.dragging=false}
  center(){const x=(this.viewport.clientWidth-this.canvas.offsetWidth)/2;const y=(this.viewport.clientHeight-this.canvas.offsetHeight)/2;this.canvas.style.marginLeft=Math.max(0,x)+"px";this.canvas.style.marginTop=Math.max(0,y)+"px"}
  reset(){this.canvas.style.marginLeft="0";this.canvas.style.marginTop="0"}
}
export default ViewportManager;
