export function createOverlaySync(subscribe, handlers = {}) {
  const stops = Object.entries(handlers).map(([path, cb]) => subscribe(path, cb));
  return () => stops.forEach(stop => typeof stop === "function" && stop());
}
export default createOverlaySync;
