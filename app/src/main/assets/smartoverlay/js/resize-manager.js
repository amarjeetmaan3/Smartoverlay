/* SmartOverlay Phase 2 - Resize Manager */
export function resizeBox(box,handle,dx,dy){
  const min=20;
  if(handle.includes("e"))box.width=Math.max(min,box.width+dx);
  if(handle.includes("s"))box.height=Math.max(min,box.height+dy);
  if(handle.includes("w")){const nw=Math.max(min,box.width-dx);box.x+=box.width-nw;box.width=nw}
  if(handle.includes("n")){const nh=Math.max(min,box.height-dy);box.y+=box.height-nh;box.height=nh}
  return box;
}
export default resizeBox;
