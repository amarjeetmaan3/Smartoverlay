export function createControllerConnectionManager() {
  let status = "unknown";
  const listeners = new Set();

  const notify = () => listeners.forEach(fn => fn(status));

  return {
    setStatus(value) {
      status = value;
      notify();
      window.dispatchEvent(new CustomEvent("smartoverlay:controller-connection", { detail: value }));
    },
    getStatus() { return status; },
    subscribe(fn) {
      if (typeof fn !== "function") return () => {};
      listeners.add(fn);
      fn(status);
      return () => listeners.delete(fn);
    }
  };
}
