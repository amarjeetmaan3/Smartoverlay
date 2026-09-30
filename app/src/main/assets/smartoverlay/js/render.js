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
export function renderCanvas(root,L,d,ed,sel){css();root.className="cv"+(ed?" ed":"");root.replaceChildren();
Object.values((L.layouts||{})[L.ratio]||{}).forEach(b=>{const e=document.createElement("div"),cam=b.bind=="camera";
e.className="bx"+(b.id===sel?" sel":"")+(cam?" cam":"");e.dataset.id=b.id;
Object.assign(e.style,{left:b.x+"%",top:b.y+"%",width:b.w+"%",height:b.h+"%",color:b.color,fontSize:b.fs+"cqw",background:cam&&!ed?"none":b.bg+Math.round(b.bgOpacity*2.55).toString(16).padStart(2,"0")});
let t=txt(b,d);if(ed&&!t&&b.bind!="image")t="["+b.bind+"]";
if(b.bind=="image"){const i=new Image();i.src=b.text||"";i.style.cssText="width:100%;height:100%;object-fit:contain;pointer-events:none";e.appendChild(i)}
else if(b.bind=="timer"){e.dataset.b="timer";e.textContent=t}
else if(b.dir){const m=document.createElement("div");m.className="mq "+(b.dir=="l"||b.dir=="r"?"h":"v");m.style.animationName="s"+b.dir;m.textContent=t;e.appendChild(m)}
else e.textContent=t;
if(ed&&b.id===sel){const h=document.createElement("i");h.className="rz";e.appendChild(h)}
root.appendChild(e)})}
export const tick=(r,d)=>r.querySelectorAll("[data-b=timer]").forEach(e=>e.textContent=fmt(left(d.timer||{})));
