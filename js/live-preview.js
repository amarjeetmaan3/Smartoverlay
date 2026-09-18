let target=null;
export function connectPreview(element){target=element;return target;}
export function disconnectPreview(){target=null;}
export function render(html){if(target)target.innerHTML=html??"";}
window.smartOverlayPreview={connectPreview,disconnectPreview,render};
