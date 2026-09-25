import { liveChannel } from "./live-channel.js";

export const liveEvents = {
  async publish(type, payload = {}) {
    const event = {
      type,
      payload,
      createdAt: { ".sv": "timestamp" }
    };
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await liveChannel.set(`events/${id}`, event);
    return { id, ...event };
  },
  listen(callback) {
    return liveChannel.listen("events", callback);
  }
};

window.smartOverlayLiveEvents = liveEvents;
