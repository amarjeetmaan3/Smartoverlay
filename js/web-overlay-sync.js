import { listenData } from "./firebase.js";

let stop=null;

export function startOverlaySync(path="smartoverlay/live",handler=()=>{}){
  if(stop) stop();
  stop=listenData(path,value=>handler(value));
  return stop;
}
export function stopOverlaySync(){
  if(stop) stop();
  stop=null;
}
