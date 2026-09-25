/* SmartOverlay Phase 2 - Layer Manager */
export function bringToFront(boxes,id){const max=Math.max(0,...boxes.map(b=>b.zIndex||0));const b=boxes.find(x=>x.id===id);if(b)b.zIndex=max+1;return b}
export function sendToBack(boxes,id){const b=boxes.find(x=>x.id===id);if(b)b.zIndex=0;return b}
export function bringForward(boxes,id){const b=boxes.find(x=>x.id===id);if(b)b.zIndex=(b.zIndex||0)+1;return b}
export function sendBackward(boxes,id){const b=boxes.find(x=>x.id===id);if(b)b.zIndex=Math.max(0,(b.zIndex||0)-1);return b}
