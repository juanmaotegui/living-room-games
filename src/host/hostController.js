/**
 * Host controller - coordinates host logic, views, and game loops.
 */

import { initHostView, renderHostLobby, updateStartButtonState, showGameCanvas, showResults, returnToLobby } from "./hostView.js";
import { startTanksGameLoop, stopTanksGameLoop } from "./tanksHostGame.js";
import {
  createRoom,
  listenToRoomInfo,
  listenToPlayers,
  listenToInputs,
  setRoomPhaseAndGame,
  initTanksGameState,
  updateTanksGameState,
} from "../firebase/roomService.js";
import { updateTanksState, detectWinner, createInitialTanksState } from "../games/tanksGameLogic.js";
import { navigateTo } from "../router.js";
import { on } from "../utils/domUtils.js";

let db = null;
let elements = null;
let roomCode = null;
let hostSessionId = null;
let players = [];
let currentGameId = null;
let roomPhase = "lobby";
let unsubscribe = {
  roomInfo: null,
  players: null,
  inputs: null,
};
let currentInputs = {};
let gameState = null;
let stopGameLoop = null;

export const hostController = {
  setDb(database) {
    db = database;
  },

  mount(container) {
    elements = initHostView(container);
    setupEventListeners();
    return unmount;
  },
};

function unmount() {
  stopAllListeners();
  if (stopGameLoop) {
    stopGameLoop();
    stopGameLoop = null;
  }
  stopTanksGameLoop();
}

function setupEventListeners() {
  on(elements.btnCreateRoom, "click", handleCreateRoom);
  on(elements.btnStartGame, "click", handleStartGame);
  on(elements.btnEndGame, "click", handleEndGame);
  on(elements.btnNextGame, "click", handlePlayAgain);
  on(elements.gameSelect, "change", handleGameSelect);
}

async function handleCreateRoom() {
  try {
    const result = await createRoom(db);
    roomCode = result.roomCode;
    hostSessionId = result.hostSessionId;

    elements.roomCodeDisplay.textContent = roomCode;
    const baseUrl = window.location.origin + window.location.pathname;
    elements.roomUrlDisplay.textContent = `${baseUrl}#/player?room=${roomCode}`;

    elements.roomInfo.classList.remove("hidden");
    elements.btnCreateRoom.disabled = true;
    elements.playersSection.classList.remove("hidden");
    elements.gameSelection.classList.remove("hidden");
    elements.controlsSection.classList.remove("hidden");

    startListeningToRoom();
  } catch (err) {
    console.error("Failed to create room:", err);
    alert("Error creating room: " + err.message);
  }
}

function startListeningToRoom() {
  // Listen to room info
  unsubscribe.roomInfo = listenToRoomInfo(db, roomCode, (info) => {
    roomPhase = info.phase;
    currentGameId = info.currentGameId;
  });

  // Listen to players
  unsubscribe.players = listenToPlayers(db, roomCode, (playersData) => {
    players = playersData;
    if (roomPhase === "lobby" || roomPhase === "results") {
      renderHostLobby(elements, players);
    }
    updateStartGameButton();
  });

  // Listen to inputs
  unsubscribe.inputs = listenToInputs(db, roomCode, (inputs) => {
    currentInputs = inputs;
  });
}

function updateStartGameButton() {
  const canStart = roomCode && currentGameId && players.length >= 2 && roomPhase === "lobby";
  updateStartButtonState(elements, canStart);
}

function handleGameSelect(e) {
  currentGameId = e.target.value || null;
  updateStartGameButton();
}

async function handleStartGame() {
  if (!roomCode || !currentGameId || players.length < 2) {
    alert("Cannot start game: need at least 2 players and a selected game");
    return;
  }

  try {
    // Set room to in-game phase
    await setRoomPhaseAndGame(db, roomCode, "inGame", currentGameId);

    if (currentGameId === "tanks") {
      await startTanksGame();
    }
  } catch (err) {
    console.error("Failed to start game:", err);
    alert("Error starting game: " + err.message);
  }
}

async function startTanksGame() {
  showGameCanvas(elements);

  // Initialize game state in Firebase
  await initTanksGameState(db, roomCode, players);

  // Create local game state copy
  gameState = createInitialTanksState(players, elements.canvas.width, elements.canvas.height);

  // Start game loop
  stopGameLoop = startTanksGameLoop({
    canvas: elements.canvas,
    roomCode,
    db,
    getInputs: () => currentInputs,
    getState: () => gameState,
    players,
    onGameEnd: handleGameEnd,
    onStateUpdate: (state) => {
      // Update game state in Firebase periodically
      updateTanksGameState(db, roomCode, {
        tanks: state.tanks,
        bullets: state.bullets,
        winnerPlayerId: state.winnerPlayerId,
      }).catch(console.error);
    },
  });

  // Game update loop (separate from rendering)
  gameUpdateLoop();
}

async function gameUpdateLoop() {
  const updateInterval = 1000 / 60; // ~60 FPS for logic
  const startTime = Date.now();

  const update = () => {
    const now = Date.now();
    const deltaTime = (now - startTime) / 1000;
    const elapsed = now - startTime;

    if (gameState && roomPhase === "inGame") {
      // Update game logic
      gameState = updateTanksState(
        gameState,
        currentInputs,
        Math.min(deltaTime / 1000, 0.033), // Cap at ~30fps step
        elements.canvas.width,
        elements.canvas.height
      );

      // Check for winner
      const winner = detectWinner(gameState);
      if (winner) {
        handleGameEnd(winner);
      }
    }

    if (roomPhase === "inGame") {
      setTimeout(update, updateInterval);
    }
  };

  update();
}

async function handleGameEnd(winnerPlayerId) {
  roomPhase = "results";

  if (stopGameLoop) {
    stopGameLoop();
    stopGameLoop = null;
  }

  // Find winner name
  const winner = players.find((p) => p.playerId === winnerPlayerId);
  const winnerName = winner ? winner.name : "Unknown";

  // Update Firebase
  await setRoomPhaseAndGame(db, roomCode, "results", currentGameId);
  await updateTanksGameState(db, roomCode, {
    finishedAt: Date.now(),
    winnerPlayerId,
  });

  showResults(elements, winnerName);
}

async function handleEndGame() {
  roomPhase = "results";

  if (stopGameLoop) {
    stopGameLoop();
    stopGameLoop = null;
  }

  await setRoomPhaseAndGame(db, roomCode, "results", null);
  showResults(elements, "Game Ended");
}

async function handlePlayAgain() {
  returnToLobby(elements, players);
  roomPhase = "lobby";
  currentGameId = null;
  gameState = null;
}

function stopAllListeners() {
  Object.values(unsubscribe).forEach((unsub) => {
    if (unsub) unsub();
  });
  unsubscribe = {
    roomInfo: null,
    players: null,
    inputs: null,
  };
}
