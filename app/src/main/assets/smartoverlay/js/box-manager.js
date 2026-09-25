import {
  addBox,
  updateBox,
  removeBox,
  duplicateBox,
  moveBox,
  resizeBox,
  rotateBox,
  setBoxVisibility,
  setBoxLock,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward
} from "./layout-engine.js";

let selectedBoxId = null;

export function selectBox(id) {
  selectedBoxId = id;

  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:box-selected",
      {
        detail: {
          id
        }
      }
    )
  );

  return id;
}

export function getSelectedBoxId() {
  return selectedBoxId;
}

export function clearSelection() {
  selectedBoxId = null;

  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:box-selected",
      {
        detail: {
          id: null
        }
      }
    )
  );
}

export function createBox(options = {}) {
  const box = addBox({
    type: options.type || "text",
    text:
      options.text ||
      "SmartOverlay",
    x: options.x ?? 100,
    y: options.y ?? 100,
    width:
      options.width ?? 320,
    height:
      options.height ?? 120,
    rotation:
      options.rotation ?? 0,
    opacity:
      options.opacity ?? 100,
    zIndex:
      options.zIndex ?? 0,
    visible:
      options.visible !== false,
    locked:
      options.locked === true,
    ...options
  });

  if (box) {
    selectBox(box.id);
  }

  return box;
}

export function editBox(
  id,
  changes
) {
  const box =
    updateBox(id, changes);

  if (box) {
    selectBox(id);
  }

  return box;
}

export function deleteBox(id) {
  if (!id) return false;

  const result =
    removeBox(id);

  if (selectedBoxId === id) {
    clearSelection();
  }

  return result;
}

export function copyBox(id) {
  return duplicateBox(id);
}

export function pasteBox(box) {
  if (!box) return null;

  return createBox({
    ...box,
    id: undefined,
    x: (box.x || 0) + 30,
    y: (box.y || 0) + 30
  });
}

export function move(id, x, y) {
  return moveBox(
    id,
    x,
    y
  );
}

export function resize(
  id,
  width,
  height
) {
  return resizeBox(
    id,
    width,
    height
  );
}

export function rotate(
  id,
  rotation
) {
  return rotateBox(
    id,
    rotation
  );
}

export function show(id) {
  return setBoxVisibility(
    id,
    true
  );
}

export function hide(id) {
  return setBoxVisibility(
    id,
    false
  );
}

export function lock(id) {
  return setBoxLock(
    id,
    true
  );
}

export function unlock(id) {
  return setBoxLock(
    id,
    false
  );
}

export function layerFront(id) {
  return bringToFront(id);
}

export function layerBack(id) {
  return sendToBack(id);
}

export function layerForward(id) {
  return bringForward(id);
}

export function layerBackward(id) {
  return sendBackward(id);
}

export function emitBoxChange(
  id,
  changes
) {
  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:box-changed",
      {
        detail: {
          id,
          changes
        }
      }
    )
  );
}

window.smartOverlayBoxManager = {
  selectBox,
  getSelectedBoxId,
  clearSelection,
  createBox,
  editBox,
  deleteBox,
  copyBox,
  pasteBox,
  move,
  resize,
  rotate,
  show,
  hide,
  lock,
  unlock,
  layerFront,
  layerBack,
  layerForward,
  layerBackward
};

console.log(
  "SmartOverlay Box Manager initialized"
);
