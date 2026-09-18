const PREFIX="smartOverlay:";
export function save(key,value){localStorage.setItem(PREFIX+key,JSON.stringify(value));return value;}
export function load(key,fallback=null){try{const v=localStorage.getItem(PREFIX+key);return v===null?fallback:JSON.parse(v);}catch{return fallback;}}
export function remove(key){localStorage.removeItem(PREFIX+key);}
export function clear(){Object.keys(localStorage).filter(k=>k.startsWith(PREFIX)).forEach(k=>localStorage.removeItem(k));}
export function has(key){return localStorage.getItem(PREFIX+key)!==null;}
window.smartOverlayStorage={save,load,remove,clear,has};
