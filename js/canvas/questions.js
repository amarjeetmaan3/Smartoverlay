import*as St from"./store.js";
const $=i=>document.getElementById(i);let bank=JSON.parse(localStorage.sq||"[]"),qi=0;
export function parse(t){const d=(t.split("\n")[0]||"").includes("\t")?"\t":",",rows=[];let r=[],c="",q=false;
for(let i=0;i<t.length;i++){const h=t[i];if(q){if(h=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=h}
else if(h=='"')q=true;else if(h==d){r.push(c);c=""}else if(h=="\n"||h=="\r"){if(h=="\r"&&t[i+1]=="\n")i++;r.push(c);rows.push(r);r=[];c=""}else c+=h}
if(c||r.length){r.push(c);rows.push(r)}
return rows.filter(r=>r.some(x=>x.trim())).filter((r,i)=>!(i==0&&/question/i.test(r[1]||""))).map((r,i)=>{
const o=[r[2],r[3],r[4],r[5]].filter(x=>x&&x.trim()),a=(r[6]||"").trim(),L="ABCD".indexOf(a.toUpperCase());
return{n:i+1,question:r[1]||"",options:o,answer:L>=0&&a.length==1&&o[L]?a.toUpperCase()+". "+o[L]:a,explanation:r[7]||""}})}
export function startQuestions(redraw){const D=St.S.D;
const sync=()=>{["Q:question","A:answer","E:explanation"].forEach(p=>{const[i,k]=p.split(":");$("chk"+i).checked=!!D.show[k]});
$("qinfo").textContent=bank.length?"सवाल: "+(qi+1)+" / "+bank.length:"कोई सवाल नहीं";D.total=bank.length;St.pubD();redraw()};
const go=i=>{if(!bank.length)return;qi=(i+bank.length)%bank.length;D.q=bank[qi];D.show={question:1,answer:0,explanation:0};
if($("autoTimer").checked){D.timer={running:true,endsAt:Date.now()+(+$("secs").value||30)*1000,left:0}}sync()};
const load=t=>{bank=parse(t);localStorage.sq=JSON.stringify(bank);qi=0;bank.length?go(0):sync()};
$("importBtn").onclick=()=>load($("csv").value);
$("file").onchange=async e=>{const f=e.target.files[0];if(f)load(await f.text())};
$("prev").onclick=()=>go(qi-1);$("next").onclick=()=>go(qi+1);$("rand").onclick=()=>go(Math.floor(Math.random()*bank.length));
$("goBtn").onclick=()=>go((+$("goto").value||1)-1);
[["chkQ","question"],["chkA","answer"],["chkE","explanation"]].forEach(([i,k])=>$(i).onchange=()=>{D.show[k]=$(i).checked?1:0;sync()});
const T=D.timer;
$("tStart").onclick=()=>{const t=D.timer;t.endsAt=Date.now()+(t.left>0&&!t.running?t.left:+$("secs").value||30)*1000;t.running=true;sync()};
$("tPause").onclick=()=>{const t=D.timer;if(t.running){t.left=Math.max(0,Math.ceil((t.endsAt-Date.now())/1000));t.running=false;sync()}};
$("tReset").onclick=()=>{D.timer={running:false,left:+$("secs").value||30};sync()};
const S=D.score,mark=k=>{S[k]++;sync()};
$("sc").onclick=()=>mark("c");$("sw").onclick=()=>mark("w");$("ss").onclick=()=>mark("s");
$("cm").onchange=()=>{S.cm=+$("cm").value;sync()};$("wm").onchange=()=>{S.wm=+$("wm").value;sync()};
$("scReset").onclick=()=>{S.c=S.w=S.s=0;sync()};$("cm").value=S.cm;$("wm").value=S.wm;
setInterval(()=>{const t=D.timer;if(t&&t.running&&Date.now()>=t.endsAt){t.running=false;t.left=0;if($("autoAns").checked)D.show.answer=1;sync();if($("autoNext").checked)setTimeout(()=>go(qi+1),3000)}},250);
D.q=bank[qi]||D.q;sync()}
