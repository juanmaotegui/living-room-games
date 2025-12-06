import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// The config is safe to commit publicly; security is enforced via Realtime Database rules.
const firebaseConfig = {
  apiKey: "AIzaSyDu71EwXEdkBaPonIkn0MTboQqqWJB3uUg",
  authDomain: "living-room-games.firebaseapp.com",
  databaseURL: "https://living-room-games-default-rtdb.firebaseio.com",
  projectId: "living-room-games",
  storageBucket: "living-room-games.firebasestorage.app",
  messagingSenderId: "1097791469514",
  appId: "1:1097791469514:web:353e654a167df3d914c133",
};

/**
 * Initializes Firebase and returns app & database references.
 * @returns {{ app, db }}
 */
export function initFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  return { app, db };
}
