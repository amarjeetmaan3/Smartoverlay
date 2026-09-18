const SCENES_KEY =
  "smartoverlay_scenes";

let scenes = [];
let activeSceneId = null;

function createId() {
  return crypto.randomUUID();
}

function clone(data) {
  return JSON.parse(
    JSON.stringify(data)
  );
}

export function createScene(
  name = "New Scene",
  data = {}
) {
  const scene = {
    id: createId(),
    name:
      String(name).trim() ||
      "New Scene",

    layout:
      clone(data.layout || {
        width: 1920,
        height: 1080,
        aspectRatio: "16:9",
        boxes: []
      }),

    content:
      clone(data.content || {}),

    behavior:
      clone(data.behavior || {}),

    theme:
      clone(data.theme || {}),

    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  scenes.push(scene);

  activeSceneId = scene.id;

  saveScenes();

  return clone(scene);
}

export function getScenes() {
  return clone(scenes);
}

export function getScene(id) {
  const scene =
    scenes.find(
      (item) => item.id === id
    );

  return scene
    ? clone(scene)
    : null;
}

export function getActiveScene() {
  if (!activeSceneId) {
    return null;
  }

  return getScene(
    activeSceneId
  );
}

export function setActiveScene(id) {
  const scene =
    scenes.find(
      (item) => item.id === id
    );

  if (!scene) return null;

  activeSceneId = id;

  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:scene-changed",
      {
        detail: clone(scene)
      }
    )
  );

  return clone(scene);
}

export function updateScene(
  id,
  changes = {}
) {
  const scene =
    scenes.find(
      (item) => item.id === id
    );

  if (!scene) return null;

  Object.assign(
    scene,
    changes
  );

  scene.updatedAt = Date.now();

  saveScenes();

  return clone(scene);
}

export function renameScene(
  id,
  name
) {
  return updateScene(id, {
    name:
      String(name).trim() ||
      "Untitled Scene"
  });
}

export function duplicateScene(
  id,
  newName
) {
  const source =
    scenes.find(
      (item) => item.id === id
    );

  if (!source) return null;

  return createScene(
    newName ||
      `${source.name} Copy`,
    source
  );
}

export function deleteScene(id) {
  const index =
    scenes.findIndex(
      (item) => item.id === id
    );

  if (index === -1) {
    return false;
  }

  scenes.splice(index, 1);

  if (activeSceneId === id) {
    activeSceneId =
      scenes[0]?.id || null;
  }

  saveScenes();

  return true;
}

export function saveSceneState(
  id,
  state = {}
) {
  const scene =
    scenes.find(
      (item) => item.id === id
    );

  if (!scene) return null;

  if (state.layout) {
    scene.layout =
      clone(state.layout);
  }

  if (state.content) {
    scene.content =
      clone(state.content);
  }

  if (state.behavior) {
    scene.behavior =
      clone(state.behavior);
  }

  if (state.theme) {
    scene.theme =
      clone(state.theme);
  }

  scene.updatedAt = Date.now();

  saveScenes();

  return clone(scene);
}

export function exportScenes() {
  return JSON.stringify(
    {
      version: 1,
      activeSceneId,
      scenes
    },
    null,
    2
  );
}

export function importScenes(
  json
) {
  try {
    const data =
      typeof json === "string"
        ? JSON.parse(json)
        : json;

    if (
      !data ||
      !Array.isArray(data.scenes)
    ) {
      throw new Error(
        "Invalid SmartOverlay scene data"
      );
    }

    scenes = clone(
      data.scenes
    );

    activeSceneId =
      data.activeSceneId ||
      scenes[0]?.id ||
      null;

    saveScenes();

    return getScenes();

  } catch (error) {
    console.error(
      "Scene import failed:",
      error
    );

    throw error;
  }
}

export function saveScenes() {
  localStorage.setItem(
    SCENES_KEY,
    JSON.stringify({
      activeSceneId,
      scenes
    })
  );
}

export function loadScenes() {
  try {
    const raw =
      localStorage.getItem(
        SCENES_KEY
      );

    if (!raw) {
      scenes = [];
      activeSceneId = null;
      return [];
    }

    const data =
      JSON.parse(raw);

    scenes =
      Array.isArray(data.scenes)
        ? data.scenes
        : [];

    activeSceneId =
      data.activeSceneId ||
      scenes[0]?.id ||
      null;

    return getScenes();

  } catch (error) {
    console.error(
      "Scene load failed:",
      error
    );

    scenes = [];
    activeSceneId = null;

    return [];
  }
}

loadScenes();

window.smartOverlayScenes = {
  createScene,
  getScenes,
  getScene,
  getActiveScene,
  setActiveScene,
  updateScene,
  renameScene,
  duplicateScene,
  deleteScene,
  saveSceneState,
  exportScenes,
  importScenes,
  saveScenes,
  loadScenes
};

console.log(
  "SmartOverlay Scene Manager initialized"
);
