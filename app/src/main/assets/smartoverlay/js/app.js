import "./firebase.js";
import "./ui-state.js";
import "./keyboard.js";
import "./touch.js";
import "./event-bus.js";
import "./notification-manager.js";
import {registerShortcut} from "./keyboard.js";
import {publishControllerState} from "./controller-core.js";
function init(){registerShortcut("ctrl+s",async()=>{try{await publishControllerState();window.smartOverlayNotify?.success("Live state saved");}catch(e){console.error(e);window.smartOverlayNotify?.error("Save failed");}});window.dispatchEvent(new CustomEvent("smartoverlay:app-ready"));console.log("SmartOverlay initialized");}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
