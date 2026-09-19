/**
 * Live dashboard state and quick-action registry.
 */
import { appState } from "../integration/app-state.js";
import { eventBus } from "../integration/event-bus.js";

const actions = new Map();

export const liveDashboard = {
  registerAction(id, handler, label = id) {
    if (!id || typeof handler !== "function") return () => {};
    actions.set(id, { id, handler, label });
    return () => actions.delete(id);
  },

  async runAction(id, payload = {}) {
    const action = actions.get(id);
    if (!action) throw new Error(`Unknown live action: ${id}`);
    const result = await action.handler(payload);
    eventBus.emit("live-dashboard:action", { id, payload, result });
    return result;
  },

  actions() {
    return [...actions.values()].map(({ id, label }) => ({ id, label }));
  },

  snapshot() {
    return appState.get();
  }
};

window.smartOverlayLiveDashboard = liveDashboard;
