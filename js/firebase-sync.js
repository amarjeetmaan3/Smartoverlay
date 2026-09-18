import {setData,updateData,getData,listenData,getServerTimestamp} from "./firebase.js";
let channel="default",unsubscribe=null;
export function setChannel(id){channel=id||"default";return channel;}
export function channelPath(path=""){return`smartOverlay/${channel}${path?"/"+path:""}`;}
export async function publish(state){return setData(channelPath("state"),{...state,updatedAt:getServerTimestamp()});}
export async function updateState(updates){return updateData(channelPath("state"),{...updates,updatedAt:getServerTimestamp()});}
export function readState(){return getData(channelPath("state"));}
export function subscribe(callback){unsubscribe?.();unsubscribe=listenData(channelPath("state"),callback);return unsubscribe;}
export function stopSync(){unsubscribe?.();unsubscribe=null;}
window.smartOverlaySync={setChannel,channelPath,publish,updateState,readState,subscribe,stopSync};
