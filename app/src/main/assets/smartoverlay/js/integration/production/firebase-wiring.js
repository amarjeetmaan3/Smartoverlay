import { listenData } from "../../firebase.js";
export async function wireFirebase(state){
 try{const stop=listenData("smartOverlay/live",data=>{state.set({connected:true,data:data||{}});state.emit("live-state",data||{});});
 state.on("destroy",()=>stop&&stop());}catch(error){state.set({connected:false,error});console.error(error);}
 return state;
}