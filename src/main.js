import { initFirebase } from "./firebase/firebaseConfig.js";
import { initRouter } from "./router.js";
import { hostController } from "./host/hostController.js";
import { playerController } from "./player/playerController.js";
import "./styles/main.css";

// Initialize Firebase once
const { db } = initFirebase();

// Share db with controllers
hostController.setDb(db);
playerController.setDb(db);

// Initialize router
const appRoot = document.getElementById("app");
initRouter(appRoot, {
  hostController,
  playerController,
});
