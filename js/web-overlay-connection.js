import { listenData } from "./firebase.js";

let unsubscribe=null;

export function connectOverlay(path="smartoverlay/live",callback=()=>{}){
  if(unsubscribe) unsubscribe();
  unsubscribe=listenData(path,data=>callback(data));
  return unsubscribe;
}

export function disconnectOverlay(){
  if(unsubscribe) unsubscribe();
  unsubscribe=null;
}
