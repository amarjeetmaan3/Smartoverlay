import { controllerFirebase, controllerLivePath } from "./controller-firebase-bridge.js";

export async function publishOverlayState(state) {
  return controllerFirebase.update({
    updatedAt: { ".sv": "timestamp" },
    state
  }, controllerLivePath);
}

export async function publishOverlayCommand(command, payload = {}) {
  return controllerFirebase.update({
    command: {
      name: command,
      payload,
      timestamp: { ".sv": "timestamp" }
    }
  }, controllerLivePath);
}
