let behavior={animation:null,autoplay:false,loop:false,delay:0,duration:600,visible:true};
export function getBehaviorState(){return{...behavior};}
export function setBehaviorState(updates={}){behavior={...behavior,...updates};emit();return getBehaviorState();}
export function resetBehavior(){behavior={animation:null,autoplay:false,loop:false,delay:0,duration:600,visible:true};emit();return getBehaviorState();}
function emit(){window.dispatchEvent(new CustomEvent("smartoverlay:behavior-change",{detail:getBehaviorState()}));}
window.smartOverlayBehavior={getBehaviorState,setBehaviorState,resetBehavior};
