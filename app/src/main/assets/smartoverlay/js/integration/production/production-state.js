export function createProductionState(mode){
 const listeners=new Map(),state={mode,connected:false,data:{}};
 return {get:()=>state,set(p){Object.assign(state,p);(listeners.get("*")||[]).forEach(f=>f(state));},
 on(e,f){const a=listeners.get(e)||[];a.push(f);listeners.set(e,a);return()=>listeners.set(e,a.filter(x=>x!==f));},
 emit(e,p){(listeners.get(e)||[]).forEach(f=>f(p));(listeners.get("*")||[]).forEach(f=>f(p));}};
}