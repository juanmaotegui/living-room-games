/**
 * Tanks game rendering on canvas (host side).
 */

import { TANK_RADIUS, BULLET_RADIUS } from "../games/tanksGameLogic.js";

let animationId = null;
let startTime = null;
let lastUpdateTime = 0;

/**
 * Start the tanks game loop on the canvas.
 * @param {Object} options
 *   - canvas: HTMLCanvasElement
 *   - roomCode: string
 *   - db: Firebase database ref
 *   - getInputs: function that returns current inputs map
 *   - getState: function that returns current game state
 *   - players: array of { playerId, name, color }
 *   - onGameEnd: callback(winnerPlayerId)
 *   - onStateUpdate: callback to update state via Firebase
 */
export function startTanksGameLoop({ canvas, roomCode, db, getInputs, getState, players, onGameEnd, onStateUpdate }) {
  const ctx = canvas.getContext("2d");
  const ARENA_WIDTH = canvas.width;
  const ARENA_HEIGHT = canvas.height;

  // Create player color map
  const playerColors = {};
  players.forEach((p) => {
    playerColors[p.playerId] = p.color;
  });

  startTime = Date.now();
  lastUpdateTime = startTime;

  const gameLoop = () => {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime) / 1000;
    lastUpdateTime = now;

    // Cap deltaTime to avoid huge jumps
    const dt = Math.min(deltaTime, 0.033); // ~30fps max step

    const state = getState();
    if (!state) {
      animationId = requestAnimationFrame(gameLoop);
      return;
    }

    // Draw background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    // Draw grid (optional)
    drawGrid(ctx, ARENA_WIDTH, ARENA_HEIGHT);

    // Draw tanks
    state.tanks &&
      Object.entries(state.tanks).forEach(([playerId, tank]) => {
        drawTank(ctx, tank, playerColors[playerId] || "#fff");
      });

    // Draw bullets
    state.bullets &&
      Object.entries(state.bullets).forEach(([_, bullet]) => {
        drawBullet(ctx, bullet);
      });

    // Draw border
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    // Periodically update Firebase (not every frame)
    if (now - lastUpdateTime > 100 || now - lastUpdateTime < 0) {
      onStateUpdate(state);
    }

    animationId = requestAnimationFrame(gameLoop);
  };

  animationId = requestAnimationFrame(gameLoop);

  // Return stop function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };
}

/**
 * Stop the current game loop.
 */
export function stopTanksGameLoop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

/**
 * Draw a tank on the canvas.
 */
function drawTank(ctx, tank, color) {
  ctx.save();
  ctx.translate(tank.x, tank.y);
  ctx.rotate(tank.angle);

  // Tank body
  ctx.fillStyle = color;
  ctx.fillRect(-TANK_RADIUS, -TANK_RADIUS / 2, TANK_RADIUS * 2, TANK_RADIUS);

  // Tank turret
  ctx.fillStyle = color;
  ctx.fillRect(-4, -8, 8, 8);

  ctx.restore();

  // Draw HP bar
  const barWidth = 30;
  const barHeight = 4;
  ctx.fillStyle = "#333";
  ctx.fillRect(tank.x - barWidth / 2, tank.y - TANK_RADIUS - 12, barWidth, barHeight);
  const hpPercent = Math.max(0, tank.hp / 3);
  ctx.fillStyle = hpPercent > 0.5 ? "#28a745" : hpPercent > 0.25 ? "#ffc107" : "#dc3545";
  ctx.fillRect(tank.x - barWidth / 2, tank.y - TANK_RADIUS - 12, barWidth * hpPercent, barHeight);

  // Draw death X if not alive
  if (!tank.alive) {
    ctx.strokeStyle = "#dc3545";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tank.x - TANK_RADIUS, tank.y - TANK_RADIUS);
    ctx.lineTo(tank.x + TANK_RADIUS, tank.y + TANK_RADIUS);
    ctx.moveTo(tank.x + TANK_RADIUS, tank.y - TANK_RADIUS);
    ctx.lineTo(tank.x - TANK_RADIUS, tank.y + TANK_RADIUS);
    ctx.stroke();
  }
}

/**
 * Draw a bullet on the canvas.
 */
function drawBullet(ctx, bullet) {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, BULLET_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  // Glow effect
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

/**
 * Draw grid lines (debug/visual aid).
 */
function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}
