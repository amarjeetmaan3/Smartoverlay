export function createControllerShell(root, context = {}) {
  if (!root) throw new Error("Controller root is required");
  root.classList.add("smart-controller");
  root.dataset.controllerPhase = "12A";

  const emit = (name, detail = {}) =>
    window.dispatchEvent(new CustomEvent(`smartoverlay:controller:${name}`, { detail }));

  return {
    root,
    context,
    emit,
    setMode(mode) {
      root.dataset.mode = mode;
      context.state?.set("mode", mode);
      emit("mode-change", { mode });
    }
  };
}
