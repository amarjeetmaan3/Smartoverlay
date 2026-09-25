let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredPrompt = event;
  window.dispatchEvent(new CustomEvent("smartoverlay:pwa-install-available"));
});

export function canInstallPWA() {
  return Boolean(deferredPrompt);
}

export async function installPWA() {
  if (!deferredPrompt) return { installed: false };
  const prompt = deferredPrompt;
  deferredPrompt = null;
  await prompt.prompt();
  const choice = await prompt.userChoice;
  return { installed: choice.outcome === "accepted", outcome: choice.outcome };
}
