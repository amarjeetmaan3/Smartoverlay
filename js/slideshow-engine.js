const shows=new Map();
export function createSlideshow(id,images=[],options={}){const v={id,images:[...images],index:0,interval:5000,loop:true,...options};shows.set(id,v);return{...v};}
export function stop(id){const v=shows.get(id);if(v?.timer)clearInterval(v.timer);if(v)v.timer=null;}
export function goTo(id,index){const v=shows.get(id);if(!v||!v.images.length)return null;v.index=Math.max(0,Math.min(index,v.images.length-1));emit(v);return v.images[v.index];}
export function next(id){const v=shows.get(id);if(!v)return null;return goTo(id,v.index+1>=v.images.length?(v.loop?0:v.index):v.index+1);}
export function previous(id){const v=shows.get(id);if(!v)return null;return goTo(id,v.index-1<0?(v.loop?v.images.length-1:0):v.index-1);}
export function start(id,onChange){const v=shows.get(id);if(!v)return null;stop(id);v.timer=setInterval(()=>{const image=next(id);onChange?.(image,v.index,v);},v.interval);return v.timer;}
function emit(v){window.dispatchEvent(new CustomEvent("smartoverlay:slideshow-change",{detail:{...v,timer:undefined}}));}
window.smartOverlaySlideshow={createSlideshow,start,stop,next,previous,goTo};
