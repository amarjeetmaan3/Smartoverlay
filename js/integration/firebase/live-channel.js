/**
 * SmartOverlay Phase 13B - Firebase live channel.
 * Uses the existing js/firebase.js helpers.
 */
import { databaseRef, setData, updateData, getData, listenData } from "../../firebase.js";

const ROOT = "smartOverlay/live";

export const liveChannel = {
  path(suffix = "") {
    return suffix ? `${ROOT}/${suffix}` : ROOT;
  },
  async get(suffix = "") {
    return await getData(this.path(suffix));
  },
  async set(suffix, data) {
    return await setData(this.path(suffix), data);
  },
  async update(suffix, data) {
    return await updateData(this.path(suffix), data);
  },
  listen(suffix, callback) {
    return listenData(this.path(suffix), callback);
  },
  ref(suffix = "") {
    return databaseRef(this.path(suffix));
  }
};

window.smartOverlayLiveChannel = liveChannel;
