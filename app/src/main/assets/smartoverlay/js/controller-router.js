const routes = new Map();

export function createControllerRouter() {
  return {
    register(name, handler) {
      if (typeof handler === "function") routes.set(name, handler);
      return handler;
    },
    run(name, payload) {
      const handler = routes.get(name);
      if (!handler) return false;
      return handler(payload);
    },
    has(name) {
      return routes.has(name);
    }
  };
}
