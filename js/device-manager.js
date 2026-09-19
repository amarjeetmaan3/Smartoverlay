/* SmartOverlay Phase 12A — Controller Device Manager */

const devices = new Map();

export function registerControllerDevice(device = {}) {
  if (!device.id) {
    throw new Error("Device ID is required");
  }

  const record = {
    id: device.id,
    name: device.name || "SmartOverlay Controller",
    type: device.type || "controller",
    platform: device.platform || "web",
    online: true,
    lastSeen: Date.now(),
    metadata: device.metadata || {}
  };

  devices.set(record.id, record);

  window.dispatchEvent(
    new CustomEvent("smartoverlay:device-registered", {
      detail: record
    })
  );

  return record;
}

export function updateControllerDevice(id, updates = {}) {
  if (!devices.has(id)) return null;

  const current = devices.get(id);

  const updated = {
    ...current,
    ...updates,
    id,
    lastSeen: Date.now()
  };

  devices.set(id, updated);

  window.dispatchEvent(
    new CustomEvent("smartoverlay:device-updated", {
      detail: updated
    })
  );

  return updated;
}

export function removeControllerDevice(id) {
  const removed = devices.delete(id);

  if (removed) {
    window.dispatchEvent(
      new CustomEvent("smartoverlay:device-removed", {
        detail: { id }
      })
    );
  }

  return removed;
}

export function getControllerDevice(id) {
  return devices.get(id) || null;
}

export function getControllerDevices() {
  return Array.from(devices.values());
}

export function setControllerDeviceOnline(id, online) {
  return updateControllerDevice(id, {
    online: Boolean(online)
  });
}

export function clearControllerDevices() {
  devices.clear();

  window.dispatchEvent(
    new CustomEvent("smartoverlay:devices-cleared")
  );
}

export default {
  registerControllerDevice,
  updateControllerDevice,
  removeControllerDevice,
  getControllerDevice,
  getControllerDevices,
  setControllerDeviceOnline,
  clearControllerDevices
};
