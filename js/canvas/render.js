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
async function pdf(c,u,n){if(!u)return;try{await lib();const d=docs[u]||(docs[u]=await pdfjsLib.getDocument(u).promise),p=await d.getPage(Math.min(Math.max(n,1),d.numPages)),v=p.getViewport({scale:3});c.width=v.width;c.height=v.height;await p.render({canvasContext:c.getContext("2d"),viewport:v}).promise}catch(e){console.error(e)}}
const KF={};
function mq(b,t){const h=b.dir=="l"||b.dir=="r",mv=+b.ms||10,tot=mv+(+b.mg||0),p=(mv/tot*100).toFixed(2),n="mq"+b.id,
a=h?"translate("+b.w+"cqw,-50%)":"translate(0,"+b.h+"cqh)",z=h?"translate(-100%,-50%)":"translate(0,-100%)",[f,o]=(b.dir=="l"||b.dir=="u")?[a,z]:[z,a];
KF[n]="@keyframes "+n+"{0%{transform:"+f+"}"+p+"%{transform:"+o+"}100%{transform:"+o+"}}";
let s=document.getElementById("mqs");if(!s){s=document.createElement("style");s.id="mqs";document.head.appendChild(s)}s.textContent=Object.values(KF).join("");
const m=document.createElement("div");m.className="mq "+(h?"h":"v");m.style.animation=n+" "+tot+"s linear "+(+b.md||0)+"s "+(+b.mn||"infinite")+" backwards";m.textContent=t;return m}
function css(){if(document.getElementById("cvcss"))return;const s=document.createElement("style");s.id="cvcss";s.textContent=`
.cv{position:relative;width:100%;height:100%;container-type:size;overflow:hidden}
.bx{position:absolute;box-sizing:border-box;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;white-space:pre-wrap;font-family:system-ui,sans-serif;font-weight:700;line-height:1.2;padding:.5cqw}
.cv:not(.ed) .bx{transition:left .08s linear,top .08s linear,width .08s linear,height .08s linear}
.bx img,.bx canvas{transition:transform .12s linear}
.ed .bx{outline:1px dashed #fff5;cursor:move}.ed .bx.sel{outline:2px solid #38bdf8}.ed .bx.cam{outline:2px dashed #22c55e;color:#22c55e99}
.rz{position:absolute;right:0;bottom:0;width:24px;height:24px;background:#38bdf8;cursor:nwse-resize;touch-action:none}
.mq.h{position:absolute;left:0;top:50%;white-space:nowrap}.mq.v{position:absolute;left:0;top:0;width:100%}`;document.head.appendChild(s)}
function make(b,t,ed,sel,cy){const e=document.createElement("div"),cam=b.bind=="camera",al=Math.round(b.bgOpacity*2.55).toString(16).padStart(2,"0"),c1=b.bg+al;
e.className="bx"+(b.id===sel?" sel":"")+(cam?" cam":"");e.dataset.id=b.id;if(b.hide)e.style.opacity=.3;
Object.assign(e.style,{color:b.color,fontSize:b.fs+"cqw",background:cam&&!ed?"none":b.g2?"linear-gradient(135deg,"+c1+","+b.g2+al+")":c1,fontFamily:b.ff||"system-ui,sans-serif",fontWeight:b.fw||700,letterSpacing:(b.ls||0)+"em",textAlign:b.al||"center",justifyContent:{left:"flex-start",right:"flex-end"}[b.al]||"center",border:b.bw?b.bw+"px solid "+(b.bc||"#fff"):"none",borderRadius:(b.rad||0)+"cqw",boxShadow:b.sh?"0 0 "+b.sh+"px #000c":"none"});
if(ed&&!t&&b.bind!="image"&&b.bind!="pdf")t="["+b.bind+"]";
if(b.bind=="image"){const U=Object.values(b.urls||[]),Ls=U.length?U:[b.text||""],sc=(b.sec||5)*1000,k=Math.floor(Date.now()/sc)%Ls.length,i=new Image();i.src=Ls[k];i.style.cssText="width:100%;height:100%;pointer-events:none;object-fit:"+(b.fit||"contain");if(Ls.length>1){i._u=Ls;i._s=sc;i.dataset.sl=1;i.dataset.k=k}e.appendChild(i)}
else if(b.bind=="pdf"){const c=document.createElement("canvas");c.style.cssText="width:100%;height:100%;object-fit:contain;pointer-events:none";e.appendChild(c);pdf(c,b.text,b.page||1)}
else if(b.bind=="timer"){e.dataset.b="timer";e.textContent=t}
else if(b.dir)e.appendChild(mq(b,t));
else e.textContent=t;
if(cy){const w=document.createElement("div");w.className="cw";w.style.cssText="display:flex;align-items:center;justify-content:center;flex:none;width:100%;height:"+100/cy+"%;transform:scaleY("+cy+")";while(e.firstChild)w.appendChild(e.firstChild);e.appendChild(w)}
if(ed&&b.id===sel){const h=document.createElement("i");h.className="rz";e.appendChild(h)}
return e}
// कैमरा खिड़की: कैमरा बॉक्स जहाँ भी हो (ऊपर या नीचे), बाकी सारे बॉक्स में उतनी जगह कटकर पारदर्शी हो जाती है
function hole(bs,i,b){if(b.bind=="camera")return"none";const hs=[],p=(v,o,s)=>((v-o)/s*100).toFixed(3)+"%";
for(let j=0;j<bs.length;j++){const c=bs[j];if(j==i||c.bind!="camera")continue;const x1=Math.max(b.x,c.x),y1=Math.max(b.y,c.y),x2=Math.min(b.x+b.w,c.x+c.w),y2=Math.min(b.y+b.h,c.y+c.h);if(x2<=x1||y2<=y1)continue;
hs.push(p(x1,b.x,b.w)+" "+p(y1,b.y,b.h)+","+p(x2,b.x,b.w)+" "+p(y1,b.y,b.h)+","+p(x2,b.x,b.w)+" "+p(y2,b.y,b.h)+","+p(x1,b.x,b.w)+" "+p(y2,b.y,b.h)+","+p(x1,b.x,b.w)+" "+p(y1,b.y,b.h)+",0 0")}
return hs.length?"polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,"+hs.join(",")+")":"none"}
// सिर्फ़ बदले हुए बॉक्स दोबारा बनते हैं, बाकी जस के तस रहते हैं (इसी से चिकनापन आता है)
export function renderCanvas(root,L,d,ed,sel){css();root.className="cv"+(ed?" ed":"");const M=root._m||(root._m=new Map()),cy=ed?0:+root.dataset.cy||0,seen=new Set();
const bs=Object.values((L.layouts||{})[L.ratio]||{}).filter(b=>ed||!b.hide);
bs.forEach((b,i)=>{const t=txt(b,d),sg=JSON.stringify({...b,x:0,y:0,w:0,h:0,zoom:0,px:0,py:0,rot:0})+"|"+t+"|"+(b.id===sel)+"|"+cy;let r=M.get(b.id);
if(!r||r.sg!==sg){const e=make(b,t,ed,sel,cy);if(r)r.e.replaceWith(e);r={e,sg};M.set(b.id,r)}
const e=r.e,s=e.style;s.left=b.x+"%";s.top=b.y+"%";s.width=b.w+"%";s.height=b.h+"%";s.transform=b.rot?"rotate("+b.rot+"deg)":"";s.clipPath=hole(bs,i,b);
const z=e.querySelector("img,canvas");if(z)z.style.transform=zt(b);
if(root.children[i]!==e)root.insertBefore(e,root.children[i]||null);seen.add(b.id)});
M.forEach((r,id)=>{if(!seen.has(id)){r.e.remove();M.delete(id)}})}
export const tick=(r,d)=>{r.querySelectorAll("[data-b=timer]").forEach(e=>(e.querySelector(".cw")||e).textContent=fmt(left(d.timer||{})));r.querySelectorAll("img[data-sl]").forEach(i=>{const k=Math.floor(Date.now()/i._s)%i._u.length;if(i.dataset.k!=k){i.dataset.k=k;i.src=i._u[k]}})};
