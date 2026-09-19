const state = {
  mode: "edit",
  selectedBoxIds: [],
  activeSceneId: null,
  dirty: false,
  connection: "unknown",
  preview: true
};

export function createControllerState(initial = {}) {
  Object.assign(state, initial);
  return {
    get: key => state[key],
    set: (key, value) => {
      state[key] = value;
      window.dispatchEvent(new CustomEvent("smartoverlay:controller-state", {
        detail: { key, value, state: { ...state } }
      }));
      return value;
    },
    patch: values => {
      Object.assign(state, values);
      window.dispatchEvent(new CustomEvent("smartoverlay:controller-state", {
        detail: { patch: values, state: { ...state } }
      }));
      return { ...state };
    },
    snapshot: () => ({ ...state })
  };
}
