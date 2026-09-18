/* SmartOverlay Phase 2 - Multi Selection */
export function getSelectionBounds(boxes){
  if(!boxes.length)return null;
  const left=Math.min(...boxes.map(b=>b.x)),top=Math.min(...boxes.map(b=>b.y));
  const right=Math.max(...boxes.map(b=>b.x+b.width)),bottom=Math.max(...boxes.map(b=>b.y+b.height));
  return {x:left,y:top,width:right-left,height:bottom-top};
}
export function moveSelection(boxes,dx,dy){boxes.forEach(b=>{b.x+=dx;b.y+=dy});return boxes}
