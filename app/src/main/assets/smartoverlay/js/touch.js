const pointers = new Map();
export function enableTouch(element = document) {
  element.addEventListener("pointerdown", e => pointers.set(e.pointerId, {x:e.clientX,y:e.clientY,t:Date.now()}));
  element.addEventListener("pointerup", e => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    pointers.delete(e.pointerId);
    const dx=e.clientX-p.x, dy=e.clientY-p.y;
    if (Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy))
      window.dispatchEvent(new CustomEvent("smartoverlay:swipe",{detail:{direction:dx>0?"right":"left"}}));
    else if (Math.abs(dy)>50)
      window.dispatchEvent(new CustomEvent("smartoverlay:swipe",{detail:{direction:dy>0?"down":"up"}}));
    else if (Date.now()-p.t>600)
      window.dispatchEvent(new CustomEvent("smartoverlay:long-press",{detail:{x:e.clientX,y:e.clientY}}));
  });
}
enableTouch();
