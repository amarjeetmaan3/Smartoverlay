/* SmartOverlay Phase 2 - Canvas Manager */
export class CanvasManager{
  constructor(el){this.el=el;this.zoom=1;this.panX=0;this.panY=0}
  setSize(w,h){this.el.style.width=w+"px";this.el.style.height=h+"px"}
  setZoom(z){this.zoom=Math.max(.1,Math.min(4,z));this.apply()}
  zoomIn(){this.setZoom(this.zoom+.1)} zoomOut(){this.setZoom(this.zoom-.1)}
  pan(x,y){this.panX=x;this.panY=y;this.apply()}
  apply(){this.el.style.transform=`translate(${this.panX}px,${this.panY}px) scale(${this.zoom})`;this.el.dispatchEvent(new CustomEvent("smartoverlay:canvas-transform",{detail:{zoom:this.zoom,panX:this.panX,panY:this.panY}}))}
  fit(vw,vh){this.setZoom(Math.min(vw/this.el.offsetWidth,vh/this.el.offsetHeight)*.9)}
}
export default CanvasManager;
