const STORAGE_KEY = "smartOverlayUIState";

const defaultState = {
  activeTool: "select",
  activePanel: "properties",
  activeScene: "Intro",
  canvasMode: "16:9",
  grid: false,
  snap: false,
  zoom: 100,
  selectedBoxId: null,
  mobilePanel: null
};

let state = {
  ...defaultState
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      state = {
        ...defaultState,
        ...JSON.parse(saved)
      };
    }
  } catch (error) {
    console.warn("SmartOverlay UI state load failed", error);
  }

  return getState();
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.warn("SmartOverlay UI state save failed", error);
  }

  window.dispatchEvent(
    new CustomEvent("smartoverlay:ui-state", {
      detail: getState()
    })
  );

  return getState();
}

function getState() {
  return {
    ...state
  };
}

function setState(updates = {}) {
  state = {
    ...state,
    ...updates
  };

  return saveState();
}

function get(key) {
  return state[key];
}

function set(key, value) {
  return setState({
    [key]: value
  });
}

function resetState() {
  state = {
    ...defaultState
  };

  return saveState();
}

loadState();

export {
  loadState,
  saveState,
  getState,
  setState,
  get,
  set,
  resetState
};

window.smartOverlayUIState = {
  loadState,
  saveState,
  getState,
  setState,
  get,
  set,
  resetState
};
