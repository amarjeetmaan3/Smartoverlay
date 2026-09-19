import { liveChannel } from "./live-channel.js";
import { setDisconnectData, getServerTimestamp } from "../../firebase.js";

function createId(prefix = "device") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const livePresence = {
  async join(device = {}) {
    const deviceId = device.deviceId || createId();
    const path = `presence/${deviceId}`;
    const data = {
      deviceId,
      role: device.role || "controller",
      name: device.name || "SmartOverlay Device",
      online: true,
      joinedAt: getServerTimestamp(),
      lastSeen: getServerTimestamp()
    };
    await liveChannel.set(path, data);
    setDisconnectData(liveChannel.path(path), {
      ...data,
      online: false,
      lastSeen: getServerTimestamp()
    });
    return data;
  },
  async heartbeat(deviceId) {
    if (!deviceId) return null;
    return liveChannel.update(`presence/${deviceId}`, {
      online: true,
      lastSeen: getServerTimestamp()
    });
  },
  listen(callback) {
    return liveChannel.listen("presence", callback);
  }
};

window.smartOverlayLivePresence = livePresence;
