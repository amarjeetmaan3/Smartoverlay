import { initWebOverlay } from "./web-overlay-runtime.js";
import { applyOverlayLayout } from "./web-overlay-layout.js";

export function startUniversalWebOverlay(options={}){
  const root=options.root||document.querySelector("#smartOverlayOverlay")||document.body;
  applyOverlayLayout(root,options.layout||{});
  return initWebOverlay({...options,root});
}
