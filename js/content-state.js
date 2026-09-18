let content={type:"none",data:{},visible:true};
export function getContentState(){return structuredClone(content);}
export function setContentState(updates={}){content={...content,...updates};emit();return getContentState();}
export function setContent(type,data={}){content={type,data,visible:true};emit();return getContentState();}
export function clearContent(){content={type:"none",data:{},visible:false};emit();}
function emit(){window.dispatchEvent(new CustomEvent("smartoverlay:content-change",{detail:getContentState()}));}
window.smartOverlayContent={getContentState,setContentState,setContent,clearContent};
