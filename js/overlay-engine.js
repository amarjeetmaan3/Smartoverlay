const elements = new Map();

let root =
  document.getElementById(
    "overlayRoot"
  ) ||
  document.getElementById(
    "overlay"
  ) ||
  document.body;

export function setRoot(
  element
) {
  if (!element) return;

  root = element;
}

export function createElement(
  item = {}
) {
  const id =
    item.id ||
    crypto.randomUUID();

  const element =
    document.createElement("div");

  element.className =
    "smartoverlay-render";

  element.dataset.id = id;
  element.dataset.type =
    item.type || "text";

  applyBoxStyles(
    element,
    item
  );

  renderContent(
    element,
    item
  );

  root.appendChild(element);

  elements.set(
    id,
    element
  );

  return element;
}

export function updateElement(
  id,
  item = {}
) {
  const element =
    elements.get(id);

  if (!element) {
    return createElement({
      ...item,
      id
    });
  }

  applyBoxStyles(
    element,
    item
  );

  renderContent(
    element,
    item
  );

  return element;
}

export function removeElement(
  id
) {
  const element =
    elements.get(id);

  if (!element) return false;

  element.remove();
  elements.delete(id);

  return true;
}

export function clearElements() {
  elements.forEach(
    (element) =>
      element.remove()
  );

  elements.clear();
}

export function getElement(id) {
  return elements.get(id) || null;
}

export function getElements() {
  return new Map(elements);
}

function applyBoxStyles(
  element,
  item
) {
  element.style.position =
    "absolute";

  element.style.left =
    `${Number(item.x) || 0}px`;

  element.style.top =
    `${Number(item.y) || 0}px`;

  element.style.width =
    `${Math.max(
      1,
      Number(item.width) || 320
    )}px`;

  element.style.height =
    `${Math.max(
      1,
      Number(item.height) || 120
    )}px`;

  element.style.opacity =
    String(
      Math.min(
        100,
        Math.max(
          0,
          Number(item.opacity ?? 100)
        )
      ) / 100
    );

  element.style.transform =
    `rotate(${Number(
      item.rotation
    ) || 0}deg)`;

  element.style.zIndex =
    String(
      Number(item.zIndex) || 0
    );

  element.style.display =
    item.visible === false
      ? "none"
      : "";

  element.style.pointerEvents =
    "none";

  element.style.overflow =
    "hidden";
}

function renderContent(
  element,
  item
) {
  element.replaceChildren();

  const type =
    item.type || "text";

  if (
    type === "image" &&
    item.url
  ) {
    const image =
      document.createElement(
        "img"
      );

    image.src = item.url;
    image.alt =
      item.name || "";

    image.style.width =
      "100%";

    image.style.height =
      "100%";

    image.style.objectFit =
      item.objectFit ||
      "contain";

    element.appendChild(
      image
    );

    return;
  }

  if (
    type === "pdf" &&
    item.url
  ) {
    const frame =
      document.createElement(
        "iframe"
      );

    frame.src = item.url;
    frame.style.width =
      "100%";

    frame.style.height =
      "100%";

    frame.style.border =
      "0";

    element.appendChild(
      frame
    );

    return;
  }

  if (
    type === "video" &&
    item.url
  ) {
    const video =
      document.createElement(
        "video"
      );

    video.src = item.url;
    video.autoplay =
      item.autoplay !== false;
    video.muted = true;
    video.loop =
      item.loop !== false;
    video.playsInline = true;

    video.style.width =
      "100%";

    video.style.height =
      "100%";

    video.style.objectFit =
      item.objectFit ||
      "contain";

    element.appendChild(
      video
    );

    return;
  }

  if (
    type === "audio" &&
    item.url
  ) {
    const audio =
      document.createElement(
        "audio"
      );

    audio.src = item.url;
    audio.controls =
      item.controls === true;

    audio.autoplay =
      item.autoplay === true;

    element.appendChild(
      audio
    );

    return;
  }

  const text =
    document.createElement(
      "div"
    );

  text.textContent =
    item.text || "";

  text.style.width =
    "100%";

  text.style.height =
    "100%";

  text.style.display =
    "flex";

  text.style.alignItems =
    item.alignItems ||
    "center";

  text.style.justifyContent =
    item.justifyContent ||
    "center";

  text.style.whiteSpace =
    item.whiteSpace ||
    "pre-wrap";

  text.style.fontSize =
    `${Number(
      item.fontSize || 32
    )}px`;

  text.style.fontWeight =
    item.fontWeight ||
    "600";

  text.style.color =
    item.color ||
    "#ffffff";

  text.style.textAlign =
    item.textAlign ||
    "center";

  text.style.padding =
    item.padding ||
    "10px";

  element.appendChild(
    text
  );
}

window.smartOverlayEngine = {
  setRoot,
  createElement,
  updateElement,
  removeElement,
  clearElements,
  getElement,
  getElements
};

console.log(
  "SmartOverlay Overlay Engine initialized"
);
