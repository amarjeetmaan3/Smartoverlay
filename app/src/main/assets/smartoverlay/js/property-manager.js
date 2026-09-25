/* SmartOverlay Phase 2 - Property Manager */
export function readProperties(box){
  return {x:box.x,y:box.y,width:box.width,height:box.height,rotation:box.rotation,opacity:Math.round((box.opacity??1)*100),zIndex:box.zIndex}
}
export function applyProperties(box,p){
  if(p.x!==undefined)box.x=Number(p.x);if(p.y!==undefined)box.y=Number(p.y);
  if(p.width!==undefined)box.width=Math.max(20,Number(p.width));if(p.height!==undefined)box.height=Math.max(20,Number(p.height));
  if(p.rotation!==undefined)box.rotation=Number(p.rotation);if(p.opacity!==undefined)box.opacity=Math.max(0,Math.min(1,Number(p.opacity)/100));
  if(p.zIndex!==undefined)box.zIndex=Number(p.zIndex);return box;
}
