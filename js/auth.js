import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey:
    "AIzaSyCyU4rj3OrqYA6RqZSSe8JW2Kbav50zis",

  authDomain:
    "ajsmartoverlay.firebaseapp.com",

  projectId:
    "ajsmartoverlay",

  storageBucket:
    "ajsmartoverlay.firebasestorage.app",

  messagingSenderId:
    "103275013011",

  appId:
    "1:103275013011:web:bc561938ff109bdc67e66"
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

let currentUser = null;

onAuthStateChanged(
  auth,
  (user) => {
    currentUser = user;

    window.dispatchEvent(
      new CustomEvent(
        "smartoverlay:auth-state",
        {
          detail: {
            user
          }
        }
      )
    );
  }
);

export async function login() {
  const result =
    await signInAnonymously(
      auth
    );

  return result.user;
}

export async function logout() {
  await signOut(auth);
}

export function getCurrentUser() {
  return currentUser;
}

export function isLoggedIn() {
  return Boolean(
    currentUser
  );
}

window.smartOverlayAuth = {
  login,
  logout,
  getCurrentUser,
  isLoggedIn
};

console.log(
  "SmartOverlay Auth initialized"
);
