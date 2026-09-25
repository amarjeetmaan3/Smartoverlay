import { createProductionState } from "./production-state.js";
import { wireFirebase } from "./firebase-wiring.js";
import { wireController } from "./controller-wiring.js";
import { wireOverlay } from "./overlay-wiring.js";
export async function startProduction({mode="controller"}={}) {
 const state=createProductionState(mode); await wireFirebase(state);
 if(mode==="overlay") await wireOverlay(state); else await wireController(state);
 window.smartOverlayProduction={mode,state}; return state;
}