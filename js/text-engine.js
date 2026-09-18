const texts=new Map();
export function createText(id,text="",options={}){const v={id,text,fontFamily:"Arial,sans-serif",fontSize:48,fontWeight:600,color:"#fff",align:"left",lineHeight:1.2,...options};texts.set(id,v);return{...v};}
export function updateText(id,updates={}){const v=texts.get(id);if(!v)return null;Object.assign(v,updates);emit(id);return{...v};}
export function getText(id){return texts.has(id)?{...texts.get(id)}:null;}
export function removeText(id){texts.delete(id);emit(id);}
export function applyText(el,data){if(!el||!data)return;el.textContent=data.text??"";el.style.fontFamily=data.fontFamily;el.style.fontSize=data.fontSize+"px";el.style.fontWeight=data.fontWeight;el.style.color=data.color;el.style.textAlign=data.align;el.style.lineHeight=data.lineHeight;}
function emit(id){window.dispatchEvent(new CustomEvent("smartoverlay:text-change",{detail:{id,text:getText(id)}}));}
window.smartOverlayText={createText,updateText,getText,removeText,applyText};
