import {getState,setState} from "./ui-state.js";
import {getContentState} from "./content-state.js";
import {getBehaviorState} from "./behavior-state.js";
import {publish} from "./firebase-sync.js";
export function getControllerState(){return{ui:getState(),content:getContentState(),behavior:getBehaviorState()};}
export function setControllerState(updates={}){if(updates.ui)setState(updates.ui);const state=getControllerState();window.dispatchEvent(new CustomEvent("smartoverlay:controller-state",{detail:state}));return state;}
export async function publishControllerState(){const state=getControllerState();await publish(state);return state;}
window.smartOverlayControllerCore={getControllerState,setControllerState,publishControllerState};
