/* SmartOverlay Phase 2 - Grid Manager */
export class GridManager{
  constructor(canvas){this.canvas=canvas;this.enabled=false;this.size=40}
  toggle(){this.enabled=!this.enabled;this.apply();return this.enabled}
  setSize(size){this.size=Math.max(4,Number(size)||40);this.apply()}
  apply(){this.canvas.classList.toggle("grid",this.enabled);this.canvas.style.backgroundSize=`${this.size}px ${this.size}px`}
}
export default GridManager;
