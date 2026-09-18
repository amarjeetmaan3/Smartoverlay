import {listenData} from "./firebase.js";
let unsubscribe=null;
export function connectOverlay(channel="default",callback){unsubscribe?.();unsubscribe=listenData(`smartOverlay/${channel}/state`,state=>{if(!state)return;callback?.(state);window.dispatchEvent(new CustomEvent("smartoverlay:overlay-state",{detail:state}));});return unsubscribe;}
export function disconnectOverlay(){unsubscribe?.();unsubscribe=null;}
window.smartOverlayOverlayCore={connectOverlay,disconnectOverlay};
