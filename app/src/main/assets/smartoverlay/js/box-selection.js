/* SmartOverlay Phase 2 - Box Selection */
export class BoxSelection{
  constructor(){this.selectedId=null;this.selectedIds=new Set()}
  select(id,add=false){if(!add)this.selectedIds.clear();if(id)this.selectedIds.add(id);this.selectedId=id;this.emit()}
  toggle(id){if(this.selectedIds.has(id))this.selectedIds.delete(id);else this.selectedIds.add(id);this.selectedId=id;this.emit()}
  clear(){this.selectedIds.clear();this.selectedId=null;this.emit()}
  getAll(){return [...this.selectedIds]}
  emit(){window.dispatchEvent(new CustomEvent("smartoverlay:selection-change",{detail:{selectedId:this.selectedId,selectedIds:this.getAll()}}))}
}
export default BoxSelection;
