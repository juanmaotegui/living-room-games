/**
 * Player controller - coordinates player logic, views, and input handling.
 */

import {
  initPlayerView,
  showJoinForm,
  showWaiting,
  showGameController,
  showResults,
  showJoinError,
  hideJoinError,
  setButtonActive,
  resetControllerButtons,
} from "./playerView.js";
import { joinRoomAsPlayer, listenToRoomInfo, updatePlayerInput, listenToInputs } from "../firebase/roomService.js";
import { on } from "../utils/domUtils.js";

let db = null;
let elements = null;
let roomCode = null;
let playerId = null;
let playerColor = null;
let playerName = null;
let roomPhase = "lobby";
let currentGameId = null;
let unsubscribe = {
  roomInfo: null,
  inputs: null,
};

// Input state for throttling
let currentInputState = { moveX: 0, moveY: 0, shoot: false };
let lastInputUpdateTime = 0;
const INPUT_THROTTLE_MS = 50; // Update inputs max 20 times per second

// Button press tracking
const buttonState = {
  up: false,
  down: false,
  left: false,
  right: false,
  shoot: false,
};

export const playerController = {
  setDb(database) {
    db = database;
  },

  mount(container) {
    elements = initPlayerView(container);
    setupEventListeners();
    showJoinForm(elements);

    // Check if room code is in URL query params
    const params = new URLSearchParams(window.location.search);
    const urlRoomCode = params.get("room");
    if (urlRoomCode) {
      elements.roomCodeInput.value = urlRoomCode;
    }

    return unmount;
  },
};

function unmount() {
  stopAllListeners();
  resetButtonListeners();
}

function setupEventListeners() {
  on(elements.btnJoin, "click", handleJoinRoom);
  on(elements.roomCodeInput, "keypress", (e) => {
    if (e.key === "Enter") handleJoinRoom();
  });

  setupControllerListeners();
}

function setupControllerListeners() {
  // Up button
  on(elements.btnUp, "pointerdown", () => setButtonDown("up"));
  on(elements.btnUp, "pointerup", () => setButtonUp("up"));
  on(elements.btnUp, "pointerleave", () => setButtonUp("up"));

  // Down button
  on(elements.btnDown, "pointerdown", () => setButtonDown("down"));
  on(elements.btnDown, "pointerup", () => setButtonUp("down"));
  on(elements.btnDown, "pointerleave", () => setButtonUp("down"));

  // Left button
  on(elements.btnLeft, "pointerdown", () => setButtonDown("left"));
  on(elements.btnLeft, "pointerup", () => setButtonUp("left"));
  on(elements.btnLeft, "pointerleave", () => setButtonUp("left"));

  // Right button
  on(elements.btnRight, "pointerdown", () => setButtonDown("right"));
  on(elements.btnRight, "pointerup", () => setButtonUp("right"));
  on(elements.btnRight, "pointerleave", () => setButtonUp("right"));

  // Shoot button
  on(elements.btnShoot, "pointerdown", () => setButtonDown("shoot"));
  on(elements.btnShoot, "pointerup", () => setButtonUp("shoot"));
  on(elements.btnShoot, "pointerleave", () => setButtonUp("shoot"));

  // Also support keyboard
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

function resetButtonListeners() {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
}

function handleKeyDown(e) {
  if (!elements.gameControllerSection.classList.contains("hidden")) {
    switch (e.key.toLowerCase()) {
      case "arrowup":
      case "w":
        setButtonDown("up");
        e.preventDefault();
        break;
      case "arrowdown":
      case "s":
        setButtonDown("down");
        e.preventDefault();
        break;
      case "arrowleft":
      case "a":
        setButtonDown("left");
        e.preventDefault();
        break;
      case "arrowright":
      case "d":
        setButtonDown("right");
        e.preventDefault();
        break;
      case " ":
        setButtonDown("shoot");
        e.preventDefault();
        break;
    }
  }
}

function handleKeyUp(e) {
  if (!elements.gameControllerSection.classList.contains("hidden")) {
    switch (e.key.toLowerCase()) {
      case "arrowup":
      case "w":
        setButtonUp("up");
        e.preventDefault();
        break;
      case "arrowdown":
      case "s":
        setButtonUp("down");
        e.preventDefault();
        break;
      case "arrowleft":
      case "a":
        setButtonUp("left");
        e.preventDefault();
        break;
      case "arrowright":
      case "d":
        setButtonUp("right");
        e.preventDefault();
        break;
      case " ":
        setButtonUp("shoot");
        e.preventDefault();
        break;
    }
  }
}

function setButtonDown(button) {
  buttonState[button] = true;
  updateVisualButton(true, button);
  updateInputState();
}

function setButtonUp(button) {
  buttonState[button] = false;
  updateVisualButton(false, button);
  updateInputState();
}

function updateVisualButton(pressed, button) {
  const buttonMap = {
    up: elements.btnUp,
    down: elements.btnDown,
    left: elements.btnLeft,
    right: elements.btnRight,
    shoot: elements.btnShoot,
  };

  if (buttonMap[button]) {
    setButtonActive(buttonMap[button], pressed);
  }
}

function updateInputState() {
  const now = Date.now();

  // Calculate movement state
  let moveX = 0;
  let moveY = 0;

  if (buttonState.left) moveX = -1;
  if (buttonState.right) moveX = 1;

  if (buttonState.up) moveY = 1;
  if (buttonState.down) moveY = -1;

  const newInputState = {
    moveX,
    moveY,
    shoot: buttonState.shoot,
  };

  // Check if input changed
  const inputChanged =
    newInputState.moveX !== currentInputState.moveX ||
    newInputState.moveY !== currentInputState.moveY ||
    newInputState.shoot !== currentInputState.shoot;

  // Send to Firebase if changed and throttle allows
  if (inputChanged && now - lastInputUpdateTime >= INPUT_THROTTLE_MS) {
    currentInputState = newInputState;
    lastInputUpdateTime = now;

    if (playerId && roomCode) {
      updatePlayerInput(db, roomCode, playerId, currentInputState).catch(console.error);
    }
  }
}

async function handleJoinRoom() {
  hideJoinError(elements);
  const roomCodeInput = elements.roomCodeInput.value.trim().toUpperCase();
  const playerNameInput = elements.playerNameInput.value.trim();

  if (!roomCodeInput || !playerNameInput) {
    showJoinError(elements, "Please enter both room code and name");
    return;
  }

  try {
    const result = await joinRoomAsPlayer(db, roomCodeInput, playerNameInput);
    roomCode = result.roomCode;
    playerId = result.playerId;
    playerColor = result.color;
    playerName = playerNameInput;

    showWaiting(elements, roomCode, playerName, playerColor);

    // Start listening to room state
    startListeningToRoom();
  } catch (err) {
    console.error("Failed to join room:", err);
    showJoinError(elements, err.message || "Failed to join room");
  }
}

function startListeningToRoom() {
  unsubscribe.roomInfo = listenToRoomInfo(db, roomCode, (info) => {
    roomPhase = info.phase;
    currentGameId = info.currentGameId;

    if (info.phase === "inGame" && info.currentGameId === "tanks") {
      showGameController(elements);
      resetControllerButtons(elements);
    } else if (info.phase === "results") {
      showResults(elements, "⏸️ Game Over");
    } else if (info.phase === "lobby") {
      showWaiting(elements, roomCode, playerName, playerColor);
    }
  });
}

function stopAllListeners() {
  Object.values(unsubscribe).forEach((unsub) => {
    if (unsub) unsub();
  });
  unsubscribe = {
    roomInfo: null,
    inputs: null,
  };
}
