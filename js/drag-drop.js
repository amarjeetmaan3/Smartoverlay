export function makeDraggable(element, options={}) {
  let start=null;
  const down=e=>{start={x:e.clientX,y:e.clientY}; options.onStart?.(e);};
  const move=e=>{if(start) options.onMove?.({event:e,dx:e.clientX-start.x,dy:e.clientY-start.y});};
  const up=e=>{if(start){options.onEnd?.(e);start=null;}};
  element.addEventListener("pointerdown",down);
  element.addEventListener("pointermove",move);
  element.addEventListener("pointerup",up);
  element.addEventListener("pointercancel",up);
  return ()=>{element.removeEventListener("pointerdown",down);element.removeEventListener("pointermove",move);element.removeEventListener("pointerup",up);element.removeEventListener("pointercancel",up);};
}
export function enableDropZone(element,onDrop){element.addEventListener("dragover",e=>e.preventDefault());element.addEventListener("drop",e=>{e.preventDefault();onDrop?.(e.dataTransfer,e);});}
