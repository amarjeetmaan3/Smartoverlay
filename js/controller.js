const canvas=document.getElementById("canvas");
const empty=document.getElementById("propertiesEmpty");
const form=document.getElementById("propertiesForm");
let selected=null, history=[], future=[];

function select(el){
  document.querySelectorAll(".element").forEach(x=>x.classList.remove("selected"));
  selected=el;
  if(!el){empty.classList.remove("hidden");form.classList.add("hidden");return;}
  el.classList.add("selected"); empty.classList.add("hidden");form.classList.remove("hidden");
  document.getElementById("textInput").value=el.dataset.text||"Element";
  document.getElementById("xInput").value=parseFloat(el.style.left)||0;
  document.getElementById("yInput").value=parseFloat(el.style.top)||0;
  document.getElementById("wInput").value=parseFloat(el.style.width)||160;
  document.getElementById("hInput").value=parseFloat(el.style.height)||70;
  document.getElementById("opacityInput").value=Math.round((parseFloat(el.style.opacity)||1)*100);
}
function addBox(type="Box"){
  const el=document.createElement("div");
  el.className="element"; el.dataset.text=type; el.textContent=type;
  el.style.left="10%";el.style.top="10%";el.style.width="180px";el.style.height="70px";
  canvas.appendChild(el); select(el); history.push(canvas.innerHTML); future=[];
  el.addEventListener("pointerdown",startDrag);
}
function startDrag(e){
  if(e.button!==undefined && e.button!==0)return;
  select(e.currentTarget);
  const el=e.currentTarget, rect=canvas.getBoundingClientRect(), startX=e.clientX, startY=e.clientY;
  const ox=el.offsetLeft, oy=el.offsetTop;
  el.classList.add("dragging"); el.setPointerCapture?.(e.pointerId);
  function move(ev){
    const nx=Math.max(0,Math.min(canvas.clientWidth-el.offsetWidth,ox+ev.clientX-startX));
    const ny=Math.max(0,Math.min(canvas.clientHeight-el.offsetHeight,oy+ev.clientY-startY));
    el.style.left=nx+"px";el.style.top=ny+"px";
    document.getElementById("xInput").value=Math.round(nx);document.getElementById("yInput").value=Math.round(ny);
  }
  function up(){el.classList.remove("dragging");el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);history.push(canvas.innerHTML);future=[]}
  el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);
}
document.getElementById("addBoxBtn").addEventListener("click",()=>addBox("Box"));
document.querySelectorAll(".tool-btn").forEach(b=>b.addEventListener("click",()=>addBox(b.dataset.tool==="select"?"Box":b.querySelector("span")?.textContent||"Element")));
canvas.addEventListener("pointerdown",e=>{if(e.target===canvas||e.target.classList.contains("canvas-grid"))select(null)});
document.getElementById("deleteBtn").addEventListener("click",()=>{if(selected){selected.remove();select(null);history.push(canvas.innerHTML)}});
document.getElementById("clearBtn").addEventListener("click",()=>{canvas.querySelectorAll(".element").forEach(e=>e.remove());select(null);history.push(canvas.innerHTML)});
document.getElementById("saveBtn").addEventListener("click",()=>{document.getElementById("connectionText").textContent="Saved locally • Ready for Firebase";});
const bind=(id,fn)=>document.getElementById(id).addEventListener("input",fn);
bind("textInput",e=>{if(selected){selected.textContent=e.target.value;selected.dataset.text=e.target.value}});
bind("xInput",e=>{if(selected)selected.style.left=Math.max(0,Number(e.target.value)||0)+"px"});
bind("yInput",e=>{if(selected)selected.style.top=Math.max(0,Number(e.target.value)||0)+"px"});
bind("wInput",e=>{if(selected)selected.style.width=Math.max(50,Number(e.target.value)||50)+"px"});
bind("hInput",e=>{if(selected)selected.style.height=Math.max(30,Number(e.target.value)||30)+"px"});
bind("opacityInput",e=>{if(selected)selected.style.opacity=(Number(e.target.value)||0)/100});
document.querySelectorAll(".scene-btn").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".scene-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.getElementById("sceneName").textContent=b.textContent}));
console.log("SmartOverlay Controller Phase 1 loaded.");
