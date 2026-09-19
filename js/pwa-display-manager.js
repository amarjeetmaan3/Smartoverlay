export function getDisplayInfo() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    standalone: window.matchMedia("(display-mode: standalone)").matches
  };
}
