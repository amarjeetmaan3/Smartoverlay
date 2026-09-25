export function installPWAErrorHandler() {
  const handler = event => {
    window.dispatchEvent(new CustomEvent("smartoverlay:pwa-error", {
      detail: event.error || event.reason || event.message || event
    }));
  };
  window.addEventListener("error", handler);
  window.addEventListener("unhandledrejection", handler);
  return () => {
    window.removeEventListener("error", handler);
    window.removeEventListener("unhandledrejection", handler);
  };
}
