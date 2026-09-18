/* SmartOverlay Phase 2 - Transform Manager */
export function setTransform(box,{x,y,width,height,rotation,opacity}={}){
  if(x!=null)box.x=Number(x);if(y!=null)box.y=Number(y);if(width!=null)box.width=Math.max(20,Number(width));
  if(height!=null)box.height=Math.max(20,Number(height));if(rotation!=null)box.rotation=Number(rotation);
  if(opacity!=null)box.opacity=Math.max(0,Math.min(1,Number(opacity)));return box;
}
export function rotate(box,degrees){box.rotation+=Number(degrees)||0;return box}
