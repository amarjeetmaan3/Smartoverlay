import { liveChannel } from "./live-channel.js";

export const livePdf = {
  async set(pdf = {}) {
    return liveChannel.set("pdf", {
      ...pdf,
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async page(page) {
    return liveChannel.update("pdf", {
      page: Math.max(1, Number(page) || 1),
      updatedAt: { ".sv": "timestamp" }
    });
  },
  async command(type, payload = {}) {
    return liveChannel.set("pdfCommand", {
      type,
      payload,
      createdAt: { ".sv": "timestamp" }
    });
  },
  listen(callback) {
    return liveChannel.listen("pdf", callback);
  },
  listenCommands(callback) {
    return liveChannel.listen("pdfCommand", callback);
  }
};

window.smartOverlayLivePdf = livePdf;
