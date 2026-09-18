const DEFAULT_CANVAS = {
  width: 1920,
  height: 1080,
  aspectRatio: "16:9"
};

let currentLayout = {
  ...DEFAULT_CANVAS,
  boxes: []
};

export function createLayout(options = {}) {
  currentLayout = {
    width: options.width || 1920,
    height: options.height || 1080,
    aspectRatio:
      options.aspectRatio ||
      calculateAspectRatio(
        options.width || 1920,
        options.height || 1080
      ),
    boxes: Array.isArray(options.boxes)
      ? options.boxes
      : []
  };

  return getLayout();
}

export function getLayout() {
  return JSON.parse(
    JSON.stringify(currentLayout)
  );
}

export function setCanvasSize(width, height) {
  const safeWidth = Math.max(1, Number(width) || 1920);
  const safeHeight = Math.max(1, Number(height) || 1080);

  currentLayout.width = safeWidth;
  currentLayout.height = safeHeight;
  currentLayout.aspectRatio =
    calculateAspectRatio(
      safeWidth,
      safeHeight
    );

  return getLayout();
}

export function addBox(box) {
  if (!box) return null;

  const item = {
    id:
      box.id ||
      crypto.randomUUID(),

    type: box.type || "text",

    text: box.text || "",

    x: Number(box.x) || 0,
    y: Number(box.y) || 0,

    width:
      Math.max(20, Number(box.width) || 320),

    height:
      Math.max(20, Number(box.height) || 120),

    rotation:
      Number(box.rotation) || 0,

    opacity:
      Math.min(
        100,
        Math.max(
          0,
          Number(box.opacity ?? 100)
        )
      ),

    zIndex:
      Number(box.zIndex) || 0,

    visible:
      box.visible !== false,

    locked:
      box.locked === true,

    ...box
  };

  currentLayout.boxes.push(item);

  return JSON.parse(
    JSON.stringify(item)
  );
}

export function updateBox(id, changes = {}) {
  const box =
    currentLayout.boxes.find(
      (item) => item.id === id
    );

  if (!box) return null;

  Object.assign(box, changes);

  box.x = Number(box.x) || 0;
  box.y = Number(box.y) || 0;

  box.width =
    Math.max(
      20,
      Number(box.width) || 20
    );

  box.height =
    Math.max(
      20,
      Number(box.height) || 20
    );

  box.rotation =
    Number(box.rotation) || 0;

  box.opacity =
    Math.min(
      100,
      Math.max(
        0,
        Number(box.opacity ?? 100)
      )
    );

  return JSON.parse(
    JSON.stringify(box)
  );
}

export function removeBox(id) {
  const index =
    currentLayout.boxes.findIndex(
      (item) => item.id === id
    );

  if (index === -1) return false;

  currentLayout.boxes.splice(
    index,
    1
  );

  return true;
}

export function duplicateBox(id) {
  const box =
    currentLayout.boxes.find(
      (item) => item.id === id
    );

  if (!box) return null;

  return addBox({
    ...box,
    id: crypto.randomUUID(),
    x: box.x + 20,
    y: box.y + 20,
    zIndex: getHighestZIndex() + 1
  });
}

export function moveBox(id, x, y) {
  return updateBox(id, {
    x: Number(x) || 0,
    y: Number(y) || 0
  });
}

export function resizeBox(
  id,
  width,
  height
) {
  return updateBox(id, {
    width,
    height
  });
}

export function rotateBox(id, rotation) {
  return updateBox(id, {
    rotation
  });
}

export function setBoxVisibility(
  id,
  visible
) {
  return updateBox(id, {
    visible: Boolean(visible)
  });
}

export function setBoxLock(
  id,
  locked
) {
  return updateBox(id, {
    locked: Boolean(locked)
  });
}

export function bringToFront(id) {
  return updateBox(id, {
    zIndex:
      getHighestZIndex() + 1
  });
}

export function sendToBack(id) {
  return updateBox(id, {
    zIndex:
      getLowestZIndex() - 1
  });
}

export function bringForward(id) {
  const box =
    currentLayout.boxes.find(
      (item) => item.id === id
    );

  if (!box) return null;

  return updateBox(id, {
    zIndex:
      Number(box.zIndex || 0) + 1
  });
}

export function sendBackward(id) {
  const box =
    currentLayout.boxes.find(
      (item) => item.id === id
    );

  if (!box) return null;

  return updateBox(id, {
    zIndex:
      Number(box.zIndex || 0) - 1
  });
}

export function clearLayout() {
  currentLayout.boxes = [];
}

export function loadLayout(layout) {
  if (!layout) return;

  currentLayout = {
    ...DEFAULT_CANVAS,
    ...layout,
    boxes: Array.isArray(layout.boxes)
      ? layout.boxes
      : []
  };

  return getLayout();
}

function getHighestZIndex() {
  if (!currentLayout.boxes.length) {
    return 0;
  }

  return Math.max(
    ...currentLayout.boxes.map(
      (box) =>
        Number(box.zIndex) || 0
    )
  );
}

function getLowestZIndex() {
  if (!currentLayout.boxes.length) {
    return 0;
  }

  return Math.min(
    ...currentLayout.boxes.map(
      (box) =>
        Number(box.zIndex) || 0
    )
  );
}

function calculateAspectRatio(
  width,
  height
) {
  const gcd = (a, b) => {
    while (b) {
      [a, b] = [b, a % b];
    }

    return a;
  };

  const divisor =
    gcd(width, height);

  return `${width / divisor}:${height / divisor}`;
}

console.log(
  "SmartOverlay Layout Engine initialized"
);
