/* SmartOverlay Phase 2 - Clipboard Manager */
export class ClipboardManager{
  constructor(){this.data=[]}
  copy(boxes){this.data=JSON.parse(JSON.stringify(boxes));return this.data}
  paste(offset=20){return this.data.map(b=>({...b,id:"box_"+Date.now()+"_"+Math.random().toString(36).slice(2,7),x:b.x+offset,y:b.y+offset}))}
}
export default ClipboardManager;
