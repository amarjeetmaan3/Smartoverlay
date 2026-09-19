/**
 * PDF bridge.
 */
import { livePdf } from "../firebase/live-pdf.js";

export const pdfBridge = {
  async set(pdf) {
    return livePdf.set(pdf);
  },
  async page(page) {
    return livePdf.page(page);
  },
  async next() {
    return livePdf.command("next");
  },
  async previous() {
    return livePdf.command("previous");
  },
  async zoom(zoom) {
    return livePdf.command("zoom", { zoom });
  },
  subscribe(callback) {
    return livePdf.listen(callback);
  },
  subscribeCommands(callback) {
    return livePdf.listenCommands(callback);
  }
};

window.smartOverlayPdfBridge = pdfBridge;
