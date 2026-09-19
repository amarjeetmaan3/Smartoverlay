export async function wireController(state){
 const root=document.getElementById("controllerApp"); if(!root)return;
 root.innerHTML='<section class="production-panel"><h2>Live Control Room</h2><p id="liveSummary">Waiting for realtime state…</p></section>';
 state.on("live-state",()=>{const e=document.getElementById("liveSummary");if(e)e.textContent="Realtime state connected.";});
}