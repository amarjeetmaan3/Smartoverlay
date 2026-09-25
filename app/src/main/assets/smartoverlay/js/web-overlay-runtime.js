import { listenData } from "./firebase.js";

const state={root:null,unsubscribe:null,path:"smartoverlay/live",connected:false};

export function initWebOverlay(options={}){
  state.root=options.root||document.querySelector("#smartOverlayOverlay")||document.body;
  state.path=options.path||"smartoverlay/live";
  if(state.unsubscribe) state.unsubscribe();
  state.unsubscribe=listenData(state.path,data=>{
    state.connected=data!==null;
    window.dispatchEvent(new CustomEvent("smartoverlay:overlay-state",{detail:data}));
    if(typeof options.onState==="function") options.onState(data);
  });
  window.dispatchEvent(new CustomEvent("smartoverlay:overlay-ready",{detail:{path:state.path}}));
  return state;
}

export function destroyWebOverlay(){
  if(state.unsubscribe) state.unsubscribe();
  state.unsubscribe=null;
  state.connected=false;
}
