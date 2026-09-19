import {setData,updateData,listenData} from "./firebase.js";
export const sceneSync={save:(path,scene)=>setData(path,scene),update:(path,patch)=>updateData(path,patch),listen:(path,cb)=>listenData(path,cb)};
export default sceneSync;
