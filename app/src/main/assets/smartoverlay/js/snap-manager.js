/* SmartOverlay Phase 2 - Snap Manager */
export function snap(value,grid=10){return Math.round(value/grid)*grid}
export function snapBox(box,grid=10){box.x=snap(box.x,grid);box.y=snap(box.y,grid);return box}
export function snapToCanvas(box,w,h){box.x=Math.max(0,Math.min(w-box.width,box.x));box.y=Math.max(0,Math.min(h-box.height,box.y));return box}
