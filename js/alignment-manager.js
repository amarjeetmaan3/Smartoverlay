/* SmartOverlay Phase 2 - Alignment Manager */
export function align(boxes,mode,canvas={width:1920,height:1080}){
  if(!boxes.length)return boxes;
  if(mode==="left")boxes.forEach(b=>b.x=0);
  if(mode==="right")boxes.forEach(b=>b.x=canvas.width-b.width);
  if(mode==="top")boxes.forEach(b=>b.y=0);
  if(mode==="bottom")boxes.forEach(b=>b.y=canvas.height-b.height);
  if(mode==="center-x")boxes.forEach(b=>b.x=(canvas.width-b.width)/2);
  if(mode==="center-y")boxes.forEach(b=>b.y=(canvas.height-b.height)/2);
  return boxes;
}
