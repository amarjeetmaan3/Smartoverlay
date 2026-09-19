import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  update,
  get,
  onValue,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyU4rj3OrqYA6RqZSSe8JW2Kbav50zis",
  authDomain: "ajsmartoverlay.firebaseapp.com",
  databaseURL: "https://ajsmartoverlay-default-rtdb.firebaseio.com/",
  projectId: "ajsmartoverlay",
  storageBucket: "ajsmartoverlay.firebasestorage.app",
  messagingSenderId: "103275013011",
  appId: "1:103275013011:web:bc561938ff109bdc67e66"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export function databaseRef(path) {
  return ref(database, path);
}

export async function setData(path, data) {
  await set(databaseRef(path), data);
  return data;
}

export async function updateData(path, data) {
  await update(databaseRef(path), data);
  return data;
}

export async function getData(path) {
  const snapshot = await get(databaseRef(path));

  return snapshot.exists()
    ? snapshot.val()
    : null;
}

export function listenData(path, callback) {
  return onValue(
    databaseRef(path),
    (snapshot) => {
      callback(
        snapshot.exists()
          ? snapshot.val()
          : null
      );
    }
  );
}

export function setDisconnectData(path, data) {
  return onDisconnect(
    databaseRef(path)
  ).set(data);
}

export function getServerTimestamp() {
  return {
    ".sv": "timestamp"
  };
}

window.smartOverlayFirebase = {
  database,
  databaseRef,
  setData,
  updateData,
  getData,
  listenData,
  setDisconnectData,
  getServerTimestamp
};

console.log("SmartOverlay Firebase initialized");
