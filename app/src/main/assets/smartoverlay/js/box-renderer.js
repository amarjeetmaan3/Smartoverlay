/* SmartOverlay Phase 2 - Box Renderer */
export class BoxRenderer{
  constructor(canvas){this.canvas=canvas;this.nodes=new Map()}
  render(box){let el=this.nodes.get(box.id);if(!el){el=document.createElement("div");el.className="so-box";el.dataset.boxId=box.id;this.canvas.appendChild(el);this.nodes.set(box.id,el)}
    el.style.left=box.x+"px";el.style.top=box.y+"px";el.style.width=box.width+"px";el.style.height=box.height+"px";el.style.opacity=box.opacity;el.style.zIndex=box.zIndex;el.style.transform=`rotate(${box.rotation}deg)`;el.textContent=box.content??"";el.classList.toggle("hidden",box.visible===false);el.classList.toggle("locked",!!box.locked);return el}
  remove(id){const el=this.nodes.get(id);if(el)el.remove();this.nodes.delete(id)}
  clear(){this.nodes.forEach(el=>el.remove());this.nodes.clear()}
}
export default BoxRenderer;
