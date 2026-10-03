const f2=n=>String(n).padStart(2,"0"),fmt=s=>f2(Math.floor(s/60))+":"+f2(s%60);
const left=t=>t.running?Math.max(0,Math.ceil((t.endsAt-Date.now())/1000)):(t.left||0);
function txt(b,d){const q=d.q,s=d.show||{},c=d.score||{c:0,w:0,s:0,cm:1,wm:0};switch(b.bind){
case"question":return q&&s.question?[q.question,...(q.options||[]).map((o,i)=>"ABCD"[i]+". "+o)].join("\n"):"";
case"answer":return q&&s.answer?q.answer||"":"";
case"explanation":return q&&s.explanation?q.explanation||"":"";
case"qno":return"Q "+(q?q.n:0)+" / "+(d.total||0);
case"timer":return fmt(left(d.timer||{}));
case"stats":return"Correct: "+c.c+"\nWrong: "+c.w+"\nSkipped: "+c.s+"\nScore: "+(c.c*c.cm-c.w*c.wm).toFixed(2);
case"camera":case"image":return"";default:return b.text||""}}
const zt=b=>b.zoom>1||b.px||b.py?"translate("+(b.px||0)+"%,"+(b.py||0)+"%) scale("+(b.zoom||1)+")":"";
const PJ="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/",docs={};let pl;
const lib=()=>pl||(pl=new Promise((ok,no)=>{const s=document.createElement("script");s.src=PJ+"pdf.min.js";s.onload=()=>{pdfjsLib.GlobalWorkerOptions.workerSrc=PJ+"pdf.worker.min.js";ok()};s.onerror=()=>no(new Error("pdf.js लोड नहीं हुआ"));document.head.appendChild(s)}));
async function pdf(c,u,n,z){if(!u)return;try{await lib();const d=docs[u]||(docs[u]=await pdfjsLib.getDocument(u).promise),p=await d.getPage(Math.min(Math.max(n,1),d.numPages)),v=p.getViewport({scale:Math.min(5,2*Math.max(1,z||1))});c.width=v.width;c.height=v.height;await p.render({canvasContext:c.getContext("2d"),viewport:v}).promise}catch(e){console.error(e)}}
function css(){if(document.getElementById("cvcss"))return;const s=document.createElement("style");s.id="cvcss";s.textContent=`
.cv{position:relative;width:100%;height:100%;container-type:size;overflow:hidden}
.bx{position:absolute;box-sizing:border-box;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;white-space:pre-wrap;font-family:system-ui,sans-serif;font-weight:700;line-height:1.2;padding:.5cqw}
.ed .bx{outline:1px dashed #fff5;cursor:move}.ed .bx.sel{outline:2px solid #38bdf8}.ed .bx.cam{outline:2px dashed #22c55e;color:#22c55e99}
.rz{position:absolute;right:0;bottom:0;width:24px;height:24px;background:#38bdf8;cursor:nwse-resize;touch-action:none}
.mq{animation:10s linear infinite}.mq.h{white-space:nowrap}.mq.v{width:100%}
@keyframes sl{from{transform:translateX(100cqw)}to{transform:translateX(-100cqw)}}
@keyframes sr{from{transform:translateX(-100cqw)}to{transform:translateX(100cqw)}}
@keyframes su{from{transform:translateY(100cqh)}to{transform:translateY(-100cqh)}}
@keyframes sd{from{transform:translateY(-100cqh)}to{transform:translateY(100cqh)}}`;document.head.appendChild(s)}
export function renderCanvas(root,L,d,ed,sel){css();root.className="cv"+(ed?" ed":"");root.replaceChildren();const cy=ed?0:+root.dataset.cy||0;
Object.values((L.layouts||{})[L.ratio]||{}).forEach(b=>{if(b.hide&&!ed)return;const e=document.createElement("div"),cam=b.bind=="camera";
e.className="bx"+(b.id===sel?" sel":"")+(cam?" cam":"");e.dataset.id=b.id;const al=Math.round(b.bgOpacity*2.55).toString(16).padStart(2,"0"),c1=b.bg+al;if(b.hide)e.style.opacity=.3;if(b.rot)e.style.transform="rotate("+b.rot+"deg)";
Object.assign(e.style,{left:b.x+"%",top:b.y+"%",width:b.w+"%",height:b.h+"%",color:b.color,fontSize:b.fs+"cqw",background:cam&&!ed?"none":b.g2?"linear-gradient(135deg,"+c1+","+b.g2+al+")":c1,fontFamily:b.ff||"system-ui,sans-serif",fontWeight:b.fw||700,letterSpacing:(b.ls||0)+"em",textAlign:b.al||"center",justifyContent:{left:"flex-start",right:"flex-end"}[b.al]||"center",border:b.bw?b.bw+"px solid "+(b.bc||"#fff"):"none",borderRadius:(b.rad||0)+"cqw",boxShadow:b.sh?"0 0 "+b.sh+"px #000c":"none"});
let t=txt(b,d);if(ed&&!t&&b.bind!="image")t="["+b.bind+"]";
if(b.bind=="image"){const U=Object.values(b.urls||[]),Ls=U.length?U:[b.text||""],sc=(b.sec||5)*1000,k=Math.floor(Date.now()/sc)%Ls.length,i=new Image();i.src=Ls[k];i.style.cssText="width:100%;height:100%;pointer-events:none;object-fit:"+(b.fit||"contain");i.style.transform=zt(b);if(Ls.length>1){i._u=Ls;i._s=sc;i.dataset.sl=1;i.dataset.k=k}e.appendChild(i)}
else if(b.bind=="pdf"){const c=document.createElement("canvas");c.style.cssText="width:100%;height:100%;object-fit:contain;pointer-events:none";c.style.transform=zt(b);e.appendChild(c);pdf(c,b.text,b.page||1,b.zoom)}
else if(b.bind=="timer"){e.dataset.b="timer";e.textContent=t}
else if(b.dir){const m=document.createElement("div");m.className="mq "+(b.dir=="l"||b.dir=="r"?"h":"v");m.style.animationName="s"+b.dir;m.textContent=t;e.appendChild(m)}
else e.textContent=t;
if(cy){const w=document.createElement("div");w.className="cw";w.style.cssText="display:flex;align-items:center;justify-content:center;flex:none;width:100%;height:"+100/cy+"%;transform:scaleY("+cy+")";while(e.firstChild)w.appendChild(e.firstChild);e.appendChild(w)}
if(ed&&b.id===sel){const h=document.createElement("i");h.className="rz";e.appendChild(h)}
root.appendChild(e)})}
export const tick=(r,d)=>{r.querySelectorAll("[data-b=timer]").forEach(e=>(e.querySelector(".cw")||e).textContent=fmt(left(d.timer||{})));r.querySelectorAll("img[data-sl]").forEach(i=>{const k=Math.floor(Date.now()/i._s)%i._u.length;if(i.dataset.k!=k){i.dataset.k=k;i.src=i._u[k]}})};
