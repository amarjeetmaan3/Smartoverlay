/* SmartOverlay Phase 2 - Guide Manager */
export class GuideManager{
  constructor(container){this.container=container;this.guides=[]}
  clear(){this.guides.forEach(g=>g.remove());this.guides=[]}
  addVertical(x){const g=document.createElement("div");g.className="so-guide v";g.style.left=x+"px";this.container.appendChild(g);this.guides.push(g);return g}
  addHorizontal(y){const g=document.createElement("div");g.className="so-guide h";g.style.top=y+"px";this.container.appendChild(g);this.guides.push(g);return g}
}
export default GuideManager;
