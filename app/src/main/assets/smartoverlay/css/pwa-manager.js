import { registerPWA } from "./pwa-registration.js";

export async function initializePWA(options = {}) {
  const result = await registerPWA(options);
  window.smartOverlayPWA = { ...result, initialized: true };
  window.dispatchEvent(new CustomEvent("smartoverlay:pwa-ready", { detail: result }));
  return window.smartOverlayPWA;
}
window.initializeSmartOverlayPWA = initializePWA;
