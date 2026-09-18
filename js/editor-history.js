/* SmartOverlay Phase 2 - Editor History */
export class EditorHistory{
  constructor(limit=100){this.limit=limit;this.undoStack=[];this.redoStack=[]}
  push(state){this.undoStack.push(JSON.parse(JSON.stringify(state)));if(this.undoStack.length>this.limit)this.undoStack.shift();this.redoStack=[]}
  undo(current){if(!this.undoStack.length)return null;this.redoStack.push(JSON.parse(JSON.stringify(current)));return this.undoStack.pop()}
  redo(current){if(!this.redoStack.length)return null;this.undoStack.push(JSON.parse(JSON.stringify(current)));return this.redoStack.pop()}
  clear(){this.undoStack=[];this.redoStack=[]}
}
export default EditorHistory;
