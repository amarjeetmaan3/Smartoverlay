import {setChannel,publish,subscribe} from "./firebase-sync.js";
export function setSceneChannel(id){return setChannel("scene-"+id);}
export function publishScene(scene){return publish({type:"scene",scene});}
export function subscribeScene(callback){return subscribe(data=>{if(data?.type==="scene")callback(data.scene,data);});}
window.smartOverlaySceneSync={setSceneChannel,publishScene,subscribeScene};
