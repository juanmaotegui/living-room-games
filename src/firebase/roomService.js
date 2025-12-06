import { ref, set, update, onValue, get, push, child, remove } from "firebase/database";

// Color palette for players
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];
let colorIndex = 0;

/**
 * Generates a short, readable room code (4-5 uppercase letters/digits).
 * @returns {string}
 */
export function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Creates a new room with a unique code.
 * @param {Object} db - Firebase Realtime Database reference
 * @returns {Promise<{ roomCode: string, hostSessionId: string }>}
 */
export async function createRoom(db) {
  const roomCode = generateRoomCode();
  const hostSessionId = Math.random().toString(36).substring(2, 9);

  const roomRef = ref(db, `rooms/${roomCode}/info`);
  await set(roomRef, {
    code: roomCode,
    hostSessionId,
    phase: "lobby",
    currentGameId: null,
    createdAt: Date.now(),
  });

  return { roomCode, hostSessionId };
}

/**
 * Listens to room info and calls callback on changes.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {Function} callback - Called with the room info object
 * @returns {Function} Unsubscribe function
 */
export function listenToRoomInfo(db, roomCode, callback) {
  const roomRef = ref(db, `rooms/${roomCode}/info`);
  return onValue(roomRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
}

/**
 * Listens to all players in a room.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {Function} callback - Called with array of players
 * @returns {Function} Unsubscribe function
 */
export function listenToPlayers(db, roomCode, callback) {
  const playersRef = ref(db, `rooms/${roomCode}/players`);
  return onValue(playersRef, (snapshot) => {
    const players = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        players.push({
          playerId: childSnap.key,
          ...childSnap.val(),
        });
      });
    }
    callback(players);
  });
}

/**
 * Joins a room as a player. Fails if game is in progress.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {string} name - Player name
 * @returns {Promise<{ roomCode: string, playerId: string, color: string }>}
 */
export async function joinRoomAsPlayer(db, roomCode, name) {
  const roomRef = ref(db, `rooms/${roomCode}/info`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room does not exist");
  }

  const roomInfo = snapshot.val();
  if (roomInfo.phase === "inGame") {
    throw new Error("Cannot join while a game is in progress");
  }

  const playerId = Math.random().toString(36).substring(2, 9);
  const color = COLORS[colorIndex % COLORS.length];
  colorIndex++;

  const playerRef = ref(db, `rooms/${roomCode}/players/${playerId}`);
  await set(playerRef, {
    name,
    color,
    joinedAt: Date.now(),
    connected: true,
  });

  return { roomCode, playerId, color };
}

/**
 * Updates the room phase and current game ID.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {string} phase - "lobby" | "inGame" | "results"
 * @param {string|null} currentGameId - Game ID or null
 * @returns {Promise<void>}
 */
export async function setRoomPhaseAndGame(db, roomCode, phase, currentGameId) {
  const roomRef = ref(db, `rooms/${roomCode}/info`);
  await update(roomRef, { phase, currentGameId });
}

/**
 * Updates player input state.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {string} playerId - The player ID
 * @param {Object} inputState - { moveX, moveY, shoot }
 * @returns {Promise<void>}
 */
export async function updatePlayerInput(db, roomCode, playerId, inputState) {
  const inputRef = ref(db, `rooms/${roomCode}/inputs/${playerId}`);
  await set(inputRef, {
    ...inputState,
    updatedAt: Date.now(),
  });
}

/**
 * Listens to all player inputs in a room.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {Function} callback - Called with object of inputs by playerId
 * @returns {Function} Unsubscribe function
 */
export function listenToInputs(db, roomCode, callback) {
  const inputsRef = ref(db, `rooms/${roomCode}/inputs`);
  return onValue(inputsRef, (snapshot) => {
    const inputs = {};
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        inputs[childSnap.key] = childSnap.val();
      });
    }
    callback(inputs);
  });
}

/**
 * Initializes the tanks game state in the database.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {Array} players - Array of player objects with playerId, color, etc.
 * @returns {Promise<void>}
 */
export async function initTanksGameState(db, roomCode, players) {
  const ARENA_WIDTH = 800;
  const ARENA_HEIGHT = 600;

  const tanks = {};
  players.forEach((player, index) => {
    const angle = (Math.PI * 2 * index) / players.length;
    const distance = 150;
    tanks[player.playerId] = {
      x: ARENA_WIDTH / 2 + Math.cos(angle) * distance,
      y: ARENA_HEIGHT / 2 + Math.sin(angle) * distance,
      angle,
      hp: 3,
      alive: true,
    };
  });

  const gameStateRef = ref(db, `rooms/${roomCode}/games/tanks/state`);
  await set(gameStateRef, {
    startedAt: Date.now(),
    finishedAt: null,
    winnerPlayerId: null,
    tanks,
    bullets: {},
  });
}

/**
 * Updates the tanks game state (partial update).
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {Object} statePatch - Partial state to update
 * @returns {Promise<void>}
 */
export async function updateTanksGameState(db, roomCode, statePatch) {
  const gameStateRef = ref(db, `rooms/${roomCode}/games/tanks/state`);
  await update(gameStateRef, statePatch);
}

/**
 * Listens to the tanks game state.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @param {Function} callback - Called with the game state
 * @returns {Function} Unsubscribe function
 */
export function listenToTanksGameState(db, roomCode, callback) {
  const gameStateRef = ref(db, `rooms/${roomCode}/games/tanks/state`);
  return onValue(gameStateRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
}

/**
 * Removes a room and all its data.
 * @param {Object} db - Firebase Realtime Database reference
 * @param {string} roomCode - The room code
 * @returns {Promise<void>}
 */
export async function deleteRoom(db, roomCode) {
  const roomRef = ref(db, `rooms/${roomCode}`);
  await remove(roomRef);
}
