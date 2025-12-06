/**
 * Host view - DOM rendering for the host side.
 */

import { qs, hide, show } from "../utils/domUtils.js";

/**
 * Initialize host view structure.
 * @param {HTMLElement} container
 * @returns {Object} View object with sections
 */
export function initHostView(container) {
  container.innerHTML = `
    <div class="host-container">
      <div class="header">
        <h1>🎮 Living Room Games - HOST</h1>
        <p>Set up and manage your game room</p>
      </div>

      <div id="room-creation" class="card">
        <h2 class="section-title">Room</h2>
        <button id="btn-create-room" class="primary">Create Room</button>
        <div id="room-info" class="hidden room-info">
          <p>Room Code:</p>
          <div class="room-code" id="room-code-display"></div>
          <p style="margin-top: 15px; font-size: 12px;">Share this link:</p>
          <div class="room-url" id="room-url-display"></div>
        </div>
      </div>

      <div id="players-section" class="hidden card">
        <h2 class="section-title">Players</h2>
        <p id="player-count">0 players</p>
        <div class="players-list" id="players-list"></div>
      </div>

      <div id="game-selection" class="hidden card">
        <h2 class="section-title">Game Selection</h2>
        <label>
          Select Game:
          <select id="game-select">
            <option value="">-- Choose a game --</option>
            <option value="tanks">Tanks War</option>
          </select>
        </label>
      </div>

      <div id="controls-section" class="hidden card">
        <h2 class="section-title">Controls</h2>
        <div class="controls">
          <button id="btn-start-game" class="primary" disabled>Start Game</button>
          <button id="btn-end-game" class="danger hidden">End Game</button>
        </div>
      </div>

      <div id="canvas-container" class="hidden canvas-container">
        <canvas id="game-canvas" width="800" height="600"></canvas>
      </div>

      <div id="results-section" class="hidden results-section">
        <h2>🏆 Game Over!</h2>
        <p id="winner-message"></p>
        <button id="btn-next-game" class="primary" style="margin-top: 20px;">Play Again</button>
      </div>
    </div>
  `;

  return {
    roomCreation: qs("#room-creation"),
    roomInfo: qs("#room-info"),
    roomCodeDisplay: qs("#room-code-display"),
    roomUrlDisplay: qs("#room-url-display"),
    btnCreateRoom: qs("#btn-create-room"),
    playersSection: qs("#players-section"),
    playerCount: qs("#player-count"),
    playersList: qs("#players-list"),
    gameSelection: qs("#game-selection"),
    gameSelect: qs("#game-select"),
    controlsSection: qs("#controls-section"),
    btnStartGame: qs("#btn-start-game"),
    btnEndGame: qs("#btn-end-game"),
    canvasContainer: qs("#canvas-container"),
    canvas: qs("#game-canvas"),
    resultsSection: qs("#results-section"),
    winnerMessage: qs("#winner-message"),
    btnNextGame: qs("#btn-next-game"),
  };
}

/**
 * Update host lobby view when players join/leave.
 * @param {Object} elements - View elements
 * @param {Array} players - Array of player objects
 */
export function renderHostLobby(elements, players) {
  const { playerCount, playersList } = elements;

  if (playerCount) {
    playerCount.textContent = `${players.length} player${players.length !== 1 ? "s" : ""}`;
  }

  if (playersList) {
    playersList.innerHTML = "";
    players.forEach((player) => {
      const badge = document.createElement("div");
      badge.className = "player-badge";
      badge.innerHTML = `
        <div class="player-color-dot" style="background-color: ${player.color}"></div>
        <span>${player.name}</span>
      `;
      playersList.appendChild(badge);
    });
  }
}

/**
 * Show the canvas game container.
 * @param {Object} elements - View elements
 */
export function showGameCanvas(elements) {
  hide(elements.playersSection);
  hide(elements.gameSelection);
  show(elements.canvasContainer);
  show(elements.btnEndGame);
  hide(elements.btnStartGame);
}

/**
 * Show the results screen.
 * @param {Object} elements - View elements
 * @param {string} winnerName - Name of the winning player
 */
export function showResults(elements, winnerName) {
  hide(elements.canvasContainer);
  hide(elements.btnEndGame);
  show(elements.resultsSection);
  if (elements.winnerMessage) {
    elements.winnerMessage.innerHTML = `<p class="winner-name">${winnerName}</p><p>wins!</p>`;
  }
}

/**
 * Return to lobby after results.
 * @param {Object} elements - View elements
 * @param {Array} players - Current players
 */
export function returnToLobby(elements, players) {
  hide(elements.resultsSection);
  show(elements.playersSection);
  show(elements.gameSelection);
  show(elements.btnStartGame);
  hide(elements.btnEndGame);
  elements.gameSelect.value = "";
  elements.btnStartGame.disabled = true;
  renderHostLobby(elements, players);
}

/**
 * Update start button state based on conditions.
 * @param {Object} elements - View elements
 * @param {boolean} canStart - Whether game can be started
 */
export function updateStartButtonState(elements, canStart) {
  elements.btnStartGame.disabled = !canStart;
}
