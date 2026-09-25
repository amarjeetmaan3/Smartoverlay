let settings={enabled:false,size:10,threshold:6};
export function configureGridSnap(v={}){settings={...settings,...v};return {...settings};}
export function snapValue(value){if(!settings.enabled)return value;const n=Math.round(value/settings.size)*settings.size;return Math.abs(n-value)<=settings.threshold?n:value;}
export function snapPosition(x,y){return{x:snapValue(x),y:snapValue(y)};}
export function toggleSnap(v){settings.enabled=v??!settings.enabled;return settings.enabled;}
export function getGridSnapSettings(){return {...settings};}
window.smartOverlayGridSnap={configureGridSnap,snapValue,snapPosition,toggleSnap,getGridSnapSettings};
