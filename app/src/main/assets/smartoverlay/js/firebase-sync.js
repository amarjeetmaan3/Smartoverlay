import { databaseRef, setData, updateData, getData, listenData } from "./firebase.js";
export const firebaseSync = {
  ref: databaseRef,
  set: setData,
  update: updateData,
  get: getData,
  listen: listenData
};
export default firebaseSync;
