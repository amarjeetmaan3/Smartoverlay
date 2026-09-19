/* SmartOverlay Controller — Phase 1–10 integration layer */

import EditorCore from "./editor-core.js";
import { align } from "./alignment-manager.js";
import { bringToFront, sendToBack, bringForward, sendBackward } from "./layer-manager.js";
import {
  getScenes,
  createScene,
  setActiveScene,
  getActiveScene,
  updateScene,
  saveSceneState,
  loadScenes
} from "./scene-manager.js";

const $ = (id) => document.getElementById(id);

let editor = null;
let activeSceneId = null;
let syncingProperties = false;

function notify(message) {
  const status = $("uploadStatus");
  if (status) status.textContent = message;
  console.log("SmartOverlay:", message);
}

function currentBoxes() {
  return editor ? editor.boxSystem.all() : [];
}

function selectedBoxes() {
  if (!editor) return [];
  return editor.selection.getAll()
    .map((id) => editor.boxSystem.get(id))
    .filter(Boolean);
}

function renderProperties() {
  if (!editor) return;
  const box = selectedBoxes()[0];
  const form = $("propertiesForm");
  const empty = $("propertiesEmpty");

  if (!box) {
    form?.classList.add("hidden");
    empty?.classList.remove("hidden");
    return;
  }

  form?.classList.remove("hidden");
  empty?.classList.add("hidden");
  syncingProperties = true;
  if ($("propText")) $("propText").value = box.content ?? "";
  if ($("propX")) $("propX").value = Math.round(box.x ?? 0);
  if ($("propY")) $("propY").value = Math.round(box.y ?? 0);
  if ($("propWidth")) $("propWidth").value = Math.round(box.width ?? 0);
  if ($("propHeight")) $("propHeight").value = Math.round(box.height ?? 0);
  if ($("propRotation")) $("propRotation").value = Math.round(box.rotation ?? 0);
  if ($("propOpacity")) $("propOpacity").value = Math.round((box.opacity ?? 1) * 100);
  syncingProperties = false;
}

function updateSelected(patch) {
  if (!editor || syncingProperties) return;
  selectedBoxes().forEach((box) => editor.update(box.id, patch));
  renderProperties();
  persistActiveScene();
}

function snapshotScene() {
  return {
    layout: {
      width: 1920,
      height: 1080,
      aspectRatio: "16:9",
      boxes: editor ? editor.export() : []
    },
    content: {},
    behavior: {},
    theme: {}
  };
}

function persistActiveScene() {
  if (!editor || !activeSceneId) return;
  saveSceneState(activeSceneId, snapshotScene());
}

function loadSceneIntoEditor(scene) {
  if (!editor || !scene) return;
  const boxes = scene.layout?.boxes || [];
  editor.import(boxes);
  $("sceneName") && ($("sceneName").textContent = scene.name);
  $("activeSceneTitle") && ($("activeSceneTitle").textContent = scene.name);
  renderProperties();
  updateSceneButtons();
}

function updateSceneButtons() {
  const active = getActiveScene();
  document.querySelectorAll("#sceneList [data-scene], .scene-item").forEach((el) => {
    const name = el.dataset.scene || el.textContent.trim();
    el.classList.toggle("active", !!active && name === active.name);
  });
}

function setupEditor() {
  const canvas = $("editorCanvas");
  if (!canvas) return;
  editor = new EditorCore(canvas);
  window.smartOverlayEditor = editor;

  editor.canvasManager.setSize(1920, 1080);

  canvas.addEventListener("click", (event) => {
    const node = event.target.closest?.(".so-box");
    if (!node) return;
    const id = node.dataset.boxId;
    if (id) editor.selection.select(id, event.shiftKey);
  });

  window.addEventListener("smartoverlay:selection-change", renderProperties);
  window.addEventListener("smartoverlay:box-update", () => {
    renderProperties();
    persistActiveScene();
  });
  window.addEventListener("smartoverlay:box-create", persistActiveScene);
  window.addEventListener("smartoverlay:box-remove", persistActiveScene);

  const scenes = loadScenes();
  if (scenes.length) {
    const active = getActiveScene();
    activeSceneId = active?.id || scenes[0].id;
    setActiveScene(activeSceneId);
    loadSceneIntoEditor(getActiveScene());
  } else {
    const scene = createScene("Intro", snapshotScene());
    activeSceneId = scene.id;
    loadSceneIntoEditor(scene);
  }

  renderProperties();
}

function setupTools() {
  $("addBoxBtn")?.addEventListener("click", () => {
    editor?.addBox({ type: "text", content: "New Box", x: 100, y: 100, width: 300, height: 100 });
  });

  $("deleteBtn")?.addEventListener("click", () => {
    selectedBoxes().forEach((box) => editor.remove(box.id));
    editor?.selection.clear();
  });

  $("clearBtn")?.addEventListener("click", () => {
    currentBoxes().forEach((box) => editor.remove(box.id));
    editor?.selection.clear();
  });

  $("duplicateBtn")?.addEventListener("click", duplicateSelected);
  $("duplicateBoxBtn")?.addEventListener("click", duplicateSelected);

  $("copyBoxBtn")?.addEventListener("click", () => {
    editor?.clipboard.copy(selectedBoxes());
  });

  $("pasteBoxBtn")?.addEventListener("click", () => {
    editor?.clipboard.paste().forEach((box) => editor.addBox(box));
  });

  $("centerBoxBtn")?.addEventListener("click", () => {
    const boxes = selectedBoxes();
    align(boxes, "center-x");
    align(boxes, "center-y");
    boxes.forEach((b) => editor.renderer.render(b));
    persistActiveScene();
  });

  $("gridBtn")?.addEventListener("click", () => editor?.grid.toggle());
  $("toggleGridBtn")?.addEventListener("click", () => editor?.grid.toggle());

  $("zoomInBtn")?.addEventListener("click", () => updateZoom(0.1));
  $("zoomOutBtn")?.addEventListener("click", () => updateZoom(-0.1));
  $("fitCanvasBtn")?.addEventListener("click", () => {
    const viewport = $("editorViewport");
    if (viewport && editor) editor.canvasManager.fit(viewport.clientWidth, viewport.clientHeight);
    updateZoomLabel();
  });

  const actions = [
    ["alignLeftBtn", "left"], ["alignRightBtn", "right"],
    ["alignTopBtn", "top"], ["alignBottomBtn", "bottom"],
    ["alignCenterXBtn", "center-x"], ["alignCenterYBtn", "center-y"]
  ];
  actions.forEach(([id, mode]) => $(id)?.addEventListener("click", () => {
    const boxes = selectedBoxes();
    align(boxes, mode);
    boxes.forEach((b) => editor.renderer.render(b));
    persistActiveScene();
  }));

  const layerActions = [
    ["bringFrontBtn", bringToFront], ["sendBackBtn", sendToBack],
    ["bringForwardBtn", bringForward], ["sendBackwardBtn", sendBackward]
  ];
  layerActions.forEach(([id, fn]) => $(id)?.addEventListener("click", () => {
    selectedBoxes().forEach((box) => fn(currentBoxes(), box.id));
    editor.syncRender();
    persistActiveScene();
  }));

  $("hideBtn")?.addEventListener("click", () => {
    selectedBoxes().forEach((box) => editor.update(box.id, { visible: false }));
  });
  $("lockBtn")?.addEventListener("click", () => {
    selectedBoxes().forEach((box) => editor.update(box.id, { locked: !box.locked }));
  });

  $("undoBtn")?.addEventListener("click", () => notify("Undo is available through the editor history integration."));
  $("redoBtn")?.addEventListener("click", () => notify("Redo is available through the editor history integration."));

  ["propText","propX","propY","propWidth","propHeight","propRotation","propOpacity"].forEach((id) => {
    $(id)?.addEventListener("input", () => {
      if (syncingProperties) return;
      const patch = {};
      if (id === "propText") patch.content = $(id).value;
      if (id === "propX") patch.x = Number($(id).value) || 0;
      if (id === "propY") patch.y = Number($(id).value) || 0;
      if (id === "propWidth") patch.width = Math.max(1, Number($(id).value) || 1);
      if (id === "propHeight") patch.height = Math.max(1, Number($(id).value) || 1);
      if (id === "propRotation") patch.rotation = Number($(id).value) || 0;
      if (id === "propOpacity") patch.opacity = Math.max(0, Math.min(1, (Number($(id).value) || 0) / 100));
      updateSelected(patch);
    });
  });

  $("saveBtn")?.addEventListener("click", () => {
    persistActiveScene();
    notify("Scene saved ✓");
  });
}

function duplicateSelected() {
  selectedBoxes().forEach((box) => {
    const copy = { ...box, id: undefined, x: (box.x || 0) + 20, y: (box.y || 0) + 20 };
    editor.addBox(copy);
  });
  persistActiveScene();
}

function updateZoom(delta) {
  if (!editor) return;
  editor.canvasManager.setZoom(editor.canvasManager.zoom + delta);
  updateZoomLabel();
}

function updateZoomLabel() {
  const value = $("zoomValue");
  if (value && editor) value.textContent = `${Math.round(editor.canvasManager.zoom * 100)}%`;
}

function setupScenes() {
  document.querySelectorAll(".scene-item, .scene-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.scene || button.textContent.trim();
      const scene = getScenes().find((s) => s.name === name);
      if (!scene) return;
      persistActiveScene();
      activeSceneId = scene.id;
      setActiveScene(scene.id);
      loadSceneIntoEditor(scene);
    });
  });

  $("newSceneBtn")?.addEventListener("click", () => {
    persistActiveScene();
    const scene = createScene("New Scene", snapshotScene());
    activeSceneId = scene.id;
    loadSceneIntoEditor(scene);
  });
}

setupEditor();
setupTools();
setupScenes();
updateZoomLabel();

console.log("SmartOverlay Controller initialized — Phase 1–10");
