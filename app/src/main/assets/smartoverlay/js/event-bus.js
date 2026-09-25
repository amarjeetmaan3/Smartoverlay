const events=new Map();
export function on(name,callback){if(!events.has(name))events.set(name,new Set());events.get(name).add(callback);return()=>off(name,callback);}
export function off(name,callback){events.get(name)?.delete(callback);}
export function emit(name,detail=null){events.get(name)?.forEach(fn=>fn(detail));window.dispatchEvent(new CustomEvent("smartoverlay:"+name,{detail}));}
export function once(name,callback){const offFn=on(name,d=>{offFn();callback(d);});return offFn;}
export function clear(name){name?events.delete(name):events.clear();}
window.smartOverlayEvents={on,off,emit,once,clear};
