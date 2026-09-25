/**
 * Live PDF controls.
 */
import { livePdf } from "../integration/firebase/live-pdf.js";

export const livePdfControl = {
  set(pdf) {
    return livePdf.set(pdf);
  },
  page(page) {
    return livePdf.page(page);
  },
  next() {
    return livePdf.command("next");
  },
  previous() {
    return livePdf.command("previous");
  },
  zoom(zoom) {
    return livePdf.command("zoom", { zoom });
  },
  listen(callback) {
    return livePdf.listen(callback);
  },
  listenCommands(callback) {
    return livePdf.listenCommands(callback);
  }
};

window.smartOverlayLivePdfControl = livePdfControl;
