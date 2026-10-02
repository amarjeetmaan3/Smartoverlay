import*as St from"./store.js";import{renderCanvas}from"./render.js";
const $=i=>document.getElementById(i),B=()=>St.boxes(),cur=()=>B().find(b=>b.id===sel),cl=(v,a,z)=>Math.max(a,Math.min(z,v));
let sel=null,drag=null;
const starter=()=>[St.mk({bind:"camera",x:2,y:2,w:38,h:42,bgOpacity:0}),St.mk({bind:"question",x:42,y:2,w:56,h:42,fs:2.2}),St.mk({bind:"timer",x:2,y:47,w:18,h:12,fs:4}),St.mk({bind:"stats",x:22,y:47,w:18,h:24,fs:1.6}),St.mk({bind:"explanation",x:42,y:47,w:56,h:30,fs:1.8}),St.mk({bind:"answer",x:2,y:74,w:38,h:14,fs:2.4})];
const F=[["fBind","bind"],["fText","text"],["fColor","color"],["fBg","bg"],["fOp","bgOpacity",2],["fFs","fs",1],["fDir","dir"],["fX","x",1],["fY","y",1],["fW","w",1],["fH","h",1],["fRot","rot",1],["fFf","ff"],["fFw","fw",1],["fAl","al"],["fLs","ls",1],["fBw","bw",1],["fBc","bc"],["fRad","rad",1],["fSh","sh",1],["fG2","g2"],["fFit","fit"],["fSec","sec",1]];
const DEF={fw:700,ls:0,al:"center",bw:0,bc:"#ffffff",rad:0,sh:0,g2:"#000000",fit:"contain",sec:5,ff:"",rot:0,dir:""};;
const g=()=>$("snap").checked?Math.max(1,+$("gs").value||5):0,sn=v=>g()?Math.round(v/g())*g():v;
export function draw(){const cv=$("cv");cv.parentElement.style.aspectRatio=St.RATIO[St.S.L.ratio];renderCanvas(cv,St.S.L,St.S.D,true,sel);{const s=g();cv.style.backgroundImage=s?"linear-gradient(#fff3 1px,transparent 1px),linear-gradient(90deg,#fff3 1px,transparent 1px)":"none";cv.style.backgroundSize=s+"% "+s+"%"}const b=cur();$("insp").style.display=b?"block":"none";if(b){F.forEach(([i,k])=>$(i).value=b[k]!=null?b[k]:DEF[k]??"");$("fLock").checked=!!b.lock;$("fHide").checked=!!b.hide}}
const up=()=>{St.pubL();draw()};
export function startEditor(){const cv=$("cv");
if(!B().length)B().push(...starter());$("ratio").value=St.S.L.ratio;
cv.addEventListener("pointerdown",e=>{const el=e.target.closest(".bx");if(!el){sel=null;return draw()}
sel=el.dataset.id;const b=cur(),rz=e.target.classList.contains("rz");if(b.lock&&!rz){draw();return}
St.snap();drag={rz,sx:e.clientX,sy:e.clientY,x:b.x,y:b.y,w:b.w,h:b.h,r:cv.getBoundingClientRect()};cv.setPointerCapture(e.pointerId);draw()});
cv.addEventListener("pointermove",e=>{if(!drag)return;const b=cur(),dx=(e.clientX-drag.sx)/drag.r.width*100,dy=(e.clientY-drag.sy)/drag.r.height*100;
if(drag.rz){b.w=cl(sn(drag.w+dx),3,100-b.x);b.h=cl(sn(drag.h+dy),3,100-b.y)}else{b.x=cl(sn(drag.x+dx),0,100-b.w);b.y=cl(sn(drag.y+dy),0,100-b.h)}up()});
cv.addEventListener("pointerup",()=>drag=null);
F.forEach(([i,k,n])=>$(i).addEventListener(n==1?"change":"input",()=>{const b=cur();if(b){if(k=="text"&&b.bind!="text"&&b.bind!="image")b.bind="text";b[k]=n?+$(i).value:$(i).value;up()}}));
$("insp").addEventListener("focusin",St.snap);
$("fLock").onchange=()=>{const b=cur();if(b){b.lock=$("fLock").checked;St.pubL()}};
$("fHide").onchange=()=>{const b=cur();if(b){b.hide=$("fHide").checked;up()}};
$("fGoff").onclick=()=>{const b=cur();if(b){St.snap();b.g2="";up()}};
$("fClr").onclick=()=>{const b=cur();if(b){St.snap();b.urls=[];up();$("upMsg").textContent="फ़ोटो हटाईं"}};
$("fUp").onchange=async e=>{const b=cur(),fs=[...e.target.files];if(!b||!fs.length)return;St.snap();$("upMsg").textContent="अपलोड हो रहा है...";
try{const{uploadFile}=await import("../media-manager.js"),u=[];for(const f of fs)u.push((await uploadFile(f,"images")).url);b.bind="image";b.urls=Object.values(b.urls||[]).concat(u);up();$("upMsg").textContent=b.urls.length+" फ़ोटो"}catch(x){$("upMsg").textContent="एरर: "+x.message}e.target.value=""};
$("tpl").onclick=()=>{St.snap();B().push(St.mk({bind:"text",text:"आपका नाम",x:3,y:84,w:52,h:8,fs:3,bg:"#1d4ed8",bgOpacity:92,al:"left",rad:.5}),St.mk({bind:"text",text:"विषय / चैनल का नाम",x:3,y:92,w:52,h:5,fs:1.8,bg:"#000000",bgOpacity:75,al:"left",rad:.5}));up()};
$("split").onclick=()=>{const b=cur();if(!b)return;St.snap();const R=St.S.L.ratio=="16:9"?16/9:9/16,c=St.mk({...b});if(b.w*R>=b.h){b.w/=2;c.x=b.x+b.w}else{b.h/=2;c.y=b.y+b.h}c.w=b.w;c.h=b.h;B().push(c);up()};
$("merge").onclick=()=>{const a=cur();if(!a)return;let best=null,bs=-1e9;B().forEach(o=>{if(o.id==a.id)return;const ix=Math.max(0,Math.min(a.x+a.w,o.x+o.w)-Math.max(a.x,o.x))*Math.max(0,Math.min(a.y+a.h,o.y+o.h)-Math.max(a.y,o.y)),sc=ix>0?1e4+ix:-(Math.abs(a.x+a.w/2-o.x-o.w/2)+Math.abs(a.y+a.h/2-o.y-o.h/2));if(sc>bs){bs=sc;best=o}});if(!best)return alert("मर्ज के लिए दूसरा बॉक्स चाहिए");St.snap();const x=Math.min(a.x,best.x),y=Math.min(a.y,best.y);a.w=Math.max(a.x+a.w,best.x+best.w)-x;a.h=Math.max(a.y+a.h,best.y+best.h)-y;a.x=x;a.y=y;B().splice(B().indexOf(best),1);up()};
$("fPdf").onchange=async e=>{const b=cur(),f=e.target.files[0];if(!b||!f)return;St.snap();$("upMsg").textContent="PDF अपलोड हो रहा है...";try{const{uploadFile}=await import("../media-manager.js");b.bind="pdf";b.text=(await uploadFile(f,"pdf")).url;b.page=1;up();$("upMsg").textContent="PDF पेज 1"}catch(x){$("upMsg").textContent="एरर: "+x.message}e.target.value=""};
const pg=d=>{const b=cur();if(b&&b.bind=="pdf"){b.page=Math.max(1,(b.page||1)+d);up();$("upMsg").textContent="पेज "+b.page}};$("pgP").onclick=()=>pg(-1);$("pgN").onclick=()=>pg(1);
$("addBtn").onclick=()=>{St.snap();const k=$("addBind").value,b=St.mk({bind:k,text:k=="text"?"नया टेक्स्ट":"",bgOpacity:k=="camera"?0:60});B().push(b);sel=b.id;up()};
$("ratio").onchange=()=>{St.snap();St.S.L.ratio=$("ratio").value;sel=null;if(!B().length)B().push(...starter());up()};
$("undo").onclick=()=>{St.undo();sel=null;draw()};$("redo").onclick=()=>{St.redo();sel=null;draw()};
$("dup").onclick=()=>{const b=cur();if(!b)return;St.snap();const c=St.mk({...b,x:Math.min(b.x+3,90),y:Math.min(b.y+3,90)});B().push(c);sel=c.id;up()};
$("del").onclick=()=>{const i=B().findIndex(b=>b.id==sel);if(i<0)return;St.snap();B().splice(i,1);sel=null;up()};
$("front").onclick=()=>{const i=B().findIndex(b=>b.id==sel);if(i<0)return;St.snap();B().push(...B().splice(i,1));up()};
$("back").onclick=()=>{const i=B().findIndex(b=>b.id==sel);if(i<0)return;St.snap();B().unshift(...B().splice(i,1));up()};
const rs=()=>{const s=$("scList");s.innerHTML="";Object.keys(St.S.scenes).forEach(n=>{const o=document.createElement("option");o.textContent=n;s.appendChild(o)})};
$("scSave").onclick=()=>{const n=St.safe($("scName").value);if(!n)return alert("सीन का नाम लिखिए");St.saveScene(n);rs();$("scList").value=n};
$("scLoad").onclick=()=>{if(St.loadScene($("scList").value)){sel=null;$("ratio").value=St.S.L.ratio;draw()}};
$("scDel").onclick=()=>{const n=$("scList").value;if(n&&confirm(n+" हटाएँ?")){St.delScene(n);rs()}};
rs();draw();St.pubL();St.pubD();return draw}
