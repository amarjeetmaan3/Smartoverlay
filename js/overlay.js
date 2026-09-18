import { supabase } from "./supabase.js";

const BUCKET = "Ajsmartoverlayfiles";

const overlayRoot =
  document.getElementById("overlayRoot") ||
  document.getElementById("overlay") ||
  document.body;

let currentScene = null;
let activeElements = new Map();

function clearOverlay() {
  activeElements.forEach((element) => {
    element.remove();
  });

  activeElements.clear();
}

function createElement(item) {
  const element = document.createElement("div");

  element.className = "smartoverlay-element";
  element.dataset.type = item.type || "text";

  element.style.position = "absolute";
  element.style.left = `${item.x || 0}px`;
  element.style.top = `${item.y || 0}px`;
  element.style.width = `${item.width || 320}px`;
  element.style.height = `${item.height || 120}px`;
  element.style.opacity =
    `${(item.opacity ?? 100) / 100}`;

  if (item.type === "image" && item.url) {
    const image = document.createElement("img");

    image.src = item.url;
    image.alt = item.name || "SmartOverlay image";

    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "contain";

    element.appendChild(image);
  }

  else if (item.type === "pdf" && item.url) {
    const iframe = document.createElement("iframe");

    iframe.src = item.url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    element.appendChild(iframe);
  }

  else if (
    item.type === "media" &&
    item.url &&
    item.mimeType?.startsWith("video/")
  ) {
    const video = document.createElement("video");

    video.src = item.url;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain";

    element.appendChild(video);
  }

  else {
    element.textContent =
      item.text || "";
  }

  overlayRoot.appendChild(element);

  return element;
}

export function renderScene(scene) {
  currentScene = scene;

  clearOverlay();

  if (!scene?.boxes) return;

  scene.boxes.forEach((item, index) => {
    const element = createElement(item);

    activeElements.set(
      item.id || index,
      element
    );
  });
}

export function showFile(file) {
  if (!file?.url) return;

  const type =
    file.type === "application/pdf"
      ? "pdf"
      : file.type?.startsWith("image/")
        ? "image"
        : "media";

  const element = createElement({
    type,
    url: file.url,
    name
