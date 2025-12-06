/**
 * Player view - DOM rendering for the player side.
 */

import { qs, hide, show } from "../utils/domUtils.js";

/**
 * Initialize player view structure.
 * @param {HTMLElement} container
 * @returns {Object} View object with sections and elements
 */
export function initPlayerView(container) {
  container.innerHTML = `
    <div class="player-container">
      <div class="player-content">
        <h1 style="text-align: center; margin-bottom: 30px;">🎮 Join Game</h1>

        <!-- Join Form -->
        <div id="join-form-section">
          <div class="form-group">
            <label for="room-code-input">Room Code:</label>
            <input
              id="room-code-input"
              type="text"
              placeholder="e.g., ABCD"
              maxlength="10"
              style="text-transform: uppercase;"
            />
          </div>
          <div class="form-group">
            <label for="player-name-input">Your Name:</label>
            <input
              id="player-name-input"
              type="text"
              placeholder="Enter your name"
              maxlength="20"
            />
          </div>
          <button id="btn-join" class="primary" style="width: 100%;">Join Room</button>
          <div id="join-error" class="error-message hidden"></div>
        </div>

        <!-- Waiting Section -->
        <div id="waiting-section" class="hidden">
          <div class="player-info">
            <div class="info-line">
              <strong>Room:</strong> <span id="room-display"></span>
            </div>
            <div class="info-line">
              <strong>Name:</strong> <span id="name-display"></span>
            </div>
            <div class="info-line">
              <strong>Color:</strong>
              <span class="color-indicator" id="color-indicator" style="background-color: #fff;"></span>
            </div>
          </div>
          <div class="waiting-message">
            <p id="waiting-message">Waiting for host to start a game...</p>
          </div>
        </div>

        <!-- Game Controller Section (Tanks) -->
        <div id="game-controller-section" class="hidden">
          <h2 style="text-align: center; margin-bottom: 20px;">Tanks War</h2>
          <div class="controller-grid">
            <button id="btn-left" class="controller-btn">←</button>
            <button id="btn-up" class="controller-btn">↑</button>
            <button id="btn-right" class="controller-btn">→</button>
            <button id="btn-down" class="controller-btn">↓</button>
          </div>
          <button id="btn-shoot" class="shoot-button primary">SHOOT</button>
        </div>

        <!-- Results Section -->
        <div id="results-section" class="hidden">
          <div class="waiting-message" id="results-message"></div>
          <p style="text-align: center; color: #aaa; font-size: 14px; margin-top: 20px;">
            Waiting for next game...
          </p>
        </div>
      </div>
    </div>
  `;

  return {
    joinFormSection: qs("#join-form-section"),
    roomCodeInput: qs("#room-code-input"),
    playerNameInput: qs("#player-name-input"),
    btnJoin: qs("#btn-join"),
    joinError: qs("#join-error"),

    waitingSection: qs("#waiting-section"),
    roomDisplay: qs("#room-display"),
    nameDisplay: qs("#name-display"),
    colorIndicator: qs("#color-indicator"),
    waitingMessage: qs("#waiting-message"),

    gameControllerSection: qs("#game-controller-section"),
    btnUp: qs("#btn-up"),
    btnDown: qs("#btn-down"),
    btnLeft: qs("#btn-left"),
    btnRight: qs("#btn-right"),
    btnShoot: qs("#btn-shoot"),

    resultsSection: qs("#results-section"),
    resultsMessage: qs("#results-message"),
  };
}

/**
 * Show join form.
 */
export function showJoinForm(elements) {
  elements.joinFormSection.classList.remove("hidden");
  elements.waitingSection.classList.add("hidden");
  elements.gameControllerSection.classList.add("hidden");
  elements.resultsSection.classList.add("hidden");
  elements.joinError.classList.add("hidden");
}

/**
 * Show waiting screen.
 */
export function showWaiting(elements, roomCode, playerName, playerColor) {
  elements.joinFormSection.classList.add("hidden");
  elements.waitingSection.classList.remove("hidden");
  elements.gameControllerSection.classList.add("hidden");
  elements.resultsSection.classList.add("hidden");

  elements.roomDisplay.textContent = roomCode;
  elements.nameDisplay.textContent = playerName;
  elements.colorIndicator.style.backgroundColor = playerColor;
}

/**
 * Show game controller.
 */
export function showGameController(elements) {
  elements.joinFormSection.classList.add("hidden");
  elements.waitingSection.classList.add("hidden");
  elements.gameControllerSection.classList.remove("hidden");
  elements.resultsSection.classList.add("hidden");

  // Reset all button states
  resetControllerButtons(elements);
}

/**
 * Show results screen.
 */
export function showResults(elements, message) {
  elements.joinFormSection.classList.add("hidden");
  elements.waitingSection.classList.add("hidden");
  elements.gameControllerSection.classList.add("hidden");
  elements.resultsSection.classList.remove("hidden");

  if (elements.resultsMessage) {
    elements.resultsMessage.textContent = message;
  }
}

/**
 * Show error message in join form.
 */
export function showJoinError(elements, message) {
  elements.joinError.textContent = message;
  elements.joinError.classList.remove("hidden");
}

/**
 * Hide error message.
 */
export function hideJoinError(elements) {
  elements.joinError.classList.add("hidden");
}

/**
 * Set a controller button as active/pressed.
 */
export function setButtonActive(button, active) {
  if (active) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
}

/**
 * Reset all controller buttons to inactive.
 */
export function resetControllerButtons(elements) {
  [elements.btnUp, elements.btnDown, elements.btnLeft, elements.btnRight, elements.btnShoot].forEach((btn) => {
    if (btn) btn.classList.remove("active");
  });
}
