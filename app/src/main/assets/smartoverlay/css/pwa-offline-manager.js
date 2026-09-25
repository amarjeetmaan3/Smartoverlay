export function createOfflineManager() {
  let online = navigator.onLine;
  const listeners = new Set();
  const notify = () => listeners.forEach(fn => fn(online));

  const onOnline = () => { online = true; notify(); };
  const onOffline = () => { online = false; notify(); };

  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  return {
    isOnline: () => online,
    subscribe(fn) {
      if (typeof fn !== "function") return () => {};
      listeners.add(fn); fn(online);
      return () => listeners.delete(fn);
    },
    destroy() {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      listeners.clear();
    }
  };
}
