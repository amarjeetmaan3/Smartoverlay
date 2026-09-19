import { setData, updateData, getData, listenData } from "./firebase.js";

export const controllerLivePath = "smartoverlay/live";

export const controllerFirebase = {
  set: (data, path = controllerLivePath) => setData(path, data),
  update: (data, path = controllerLivePath) => updateData(path, data),
  get: (path = controllerLivePath) => getData(path),
  listen: (callback, path = controllerLivePath) => listenData(path, callback)
};
