const MAX=100;let undoStack=[],redoStack=[];
const clone=v=>JSON.parse(JSON.stringify(v));
export function push(state){undoStack.push(clone(state));if(undoStack.length>MAX)undoStack.shift();redoStack=[];emit();}
export function undo(current){if(!undoStack.length)return current;redoStack.push(clone(current));const v=undoStack.pop();emit();return clone(v);}
export function redo(current){if(!redoStack.length)return current;undoStack.push(clone(current));const v=redoStack.pop();emit();return clone(v);}
export function clear(){undoStack=[];redoStack=[];emit();}
export function canUndo(){return !!undoStack.length;}
export function canRedo(){return !!redoStack.length;}
function emit(){window.dispatchEvent(new CustomEvent("smartoverlay:history-change",{detail:{undo:undoStack.length,redo:redoStack.length}}));}
window.smartOverlayHistory={push,undo,redo,clear,canUndo,canRedo};
