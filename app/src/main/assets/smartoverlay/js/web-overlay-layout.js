export function applyOverlayLayout(root,layout={}){
  if(!root) return;
  if(layout.width) root.style.width=layout.width;
  if(layout.height) root.style.height=layout.height;
  if(layout.background!==undefined) root.style.background=layout.background;
  if(layout.aspectRatio) root.style.aspectRatio=layout.aspectRatio;
}
