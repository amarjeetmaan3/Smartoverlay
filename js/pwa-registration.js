export async function registerPWA({ serviceWorker = "./sw.js" } = {}) {
  if (!("serviceWorker" in navigator)) {
    return { supported: false, registered: false };
  }
  try {
    const registration = await navigator.serviceWorker.register(serviceWorker);
    return { supported: true, registered: true, registration };
  } catch (error) {
    return { supported: true, registered: false, error };
  }
}
