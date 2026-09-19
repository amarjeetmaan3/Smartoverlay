export async function wireOverlay(state){
 const root=document.getElementById("smartOverlayOverlay");if(!root)return;
 const render=data=>{root.replaceChildren();const text=data?.content?.text??data?.content?.question;
 if(text){const b=document.createElement("div");b.className="overlay-content";b.textContent=String(text);root.appendChild(b);}};
 state.on("live-state",render);render(state.get().data);
}