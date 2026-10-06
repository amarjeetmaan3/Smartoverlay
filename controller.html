import{setData,getData}from"../firebase.js";
const P="smartOverlay/canvas/";
export const RATIO={"16:9":"16/9","9:16":"9/16"};
export const S={scenes:{},L:{ratio:"16:9",layouts:{"16:9":[],"9:16":[]}},D:{q:null,total:0,show:{question:1,answer:0,explanation:0},timer:{left:0,running:false},score:{c:0,w:0,s:0,cm:1,wm:.25}}};
const H=[],R=[];let t1,t2;
export const boxes=()=>S.L.layouts[S.L.ratio]||(S.L.layouts[S.L.ratio]=[]);
export const mk=o=>({x:5,y:5,w:30,h:20,bind:"text",text:"Text",color:"#ffffff",bg:"#000000",bgOpacity:60,fs:3,dir:"",lock:false,hide:false,rot:0,zoom:1,px:0,py:0,ff:"",fw:700,ls:0,al:"center",bw:0,bc:"#ffffff",rad:0,sh:0,g2:"",fit:"contain",sec:5,urls:[],...o,id:"b"+Math.random().toString(36).slice(2,8)});
const clean=x=>JSON.parse(JSON.stringify(x));
export function snap(){H.push(JSON.stringify(S.L));if(H.length>60)H.shift();R.length=0}
export function undo(){if(H.length){R.push(JSON.stringify(S.L));S.L=JSON.parse(H.pop());pubL()}}
export function redo(){if(R.length){H.push(JSON.stringify(S.L));S.L=JSON.parse(R.pop());pubL()}}
export function pubL(){clearTimeout(t1);t1=setTimeout(()=>setData(P+"layout",clean(S.L)).catch(e=>alert("Firebase: "+e.message)),50)}
export function pubD(){clearTimeout(t2);t2=setTimeout(()=>setData(P+"data",clean(S.D)).catch(console.error),100)}
export async function load(){const v=await getData("smartOverlay/canvas");if(v&&v.layout){S.L=v.layout;S.L.layouts=S.L.layouts||{}}if(v&&v.data)S.D={...S.D,...v.data};if(v&&v.scenes)S.scenes=v.scenes}
export const safe=n=>n.replace(/[.#$\/\[\]]/g,"-").trim();
export const pubS=()=>setData(P+"scenes",clean(S.scenes)).catch(e=>alert("Firebase: "+e.message));
export function saveScene(n){S.scenes[n]=clean(S.L);pubS()}
export function loadScene(n){if(!S.scenes[n])return false;snap();S.L=clean(S.scenes[n]);S.L.layouts=S.L.layouts||{};pubL();return true}
export function delScene(n){delete S.scenes[n];pubS()}
