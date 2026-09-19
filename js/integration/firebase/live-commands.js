import { liveChannel } from "./live-channel.js";

export const liveCommands = {
  async send(type, payload = {}) {
    const command = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      payload,
      createdAt: { ".sv": "timestamp" }
    };
    await liveChannel.set(`commands/${command.id}`, command);
    return command;
  },
  listen(callback) {
    return liveChannel.listen("commands", callback);
  }
};

window.smartOverlayLiveCommands = liveCommands;
