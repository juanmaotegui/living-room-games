/**
 * Tanks War game logic and utilities.
 * Independent of rendering/UI.
 */

export const TANK_RADIUS = 15;
export const BULLET_RADIUS = 5;
export const TANK_SPEED = 150; // pixels per second
export const BULLET_SPEED = 300; // pixels per second
export const TURN_SPEED = Math.PI * 2; // radians per second (full rotation)
export const SHOOT_COOLDOWN = 300; // milliseconds
export const TANK_HP = 3;

/**
 * Create initial game state for tanks.
 * @param {Array} players - Array of { playerId, name, color }
 * @param {number} arenaWidth
 * @param {number} arenaHeight
 * @returns {Object} Initial game state
 */
export function createInitialTanksState(players, arenaWidth, arenaHeight) {
  const tanks = {};
  players.forEach((player, index) => {
    const angle = (Math.PI * 2 * index) / players.length;
    const distance = 150;
    tanks[player.playerId] = {
      x: arenaWidth / 2 + Math.cos(angle) * distance,
      y: arenaHeight / 2 + Math.sin(angle) * distance,
      angle,
      hp: TANK_HP,
      alive: true,
      lastShootTime: 0,
    };
  });

  return {
    startedAt: Date.now(),
    finishedAt: null,
    winnerPlayerId: null,
    tanks,
    bullets: {},
  };
}

/**
 * Update game state based on player inputs and delta time.
 * @param {Object} state - Current game state
 * @param {Object} inputsByPlayerId - Current inputs from all players
 * @param {number} deltaTime - Delta time in seconds
 * @param {number} arenaWidth
 * @param {number} arenaHeight
 * @returns {Object} Updated state
 */
export function updateTanksState(state, inputsByPlayerId, deltaTime, arenaWidth, arenaHeight) {
  const now = Date.now();

  // Update tank positions and handle rotation
  Object.entries(state.tanks).forEach(([playerId, tank]) => {
    if (!tank.alive) return;

    const input = inputsByPlayerId[playerId] || {};
    const moveX = input.moveX || 0;
    const moveY = input.moveY || 0;

    // Rotation based on input (not movement direction)
    if (moveX !== 0) {
      tank.angle += TURN_SPEED * deltaTime * moveX;
    }

    // Forward/backward movement
    if (moveY !== 0) {
      const moveDir = moveY > 0 ? 1 : -1;
      tank.x += Math.cos(tank.angle) * TANK_SPEED * deltaTime * moveDir;
      tank.y += Math.sin(tank.angle) * TANK_SPEED * deltaTime * moveDir;

      // Keep tank in bounds
      tank.x = Math.max(TANK_RADIUS, Math.min(arenaWidth - TANK_RADIUS, tank.x));
      tank.y = Math.max(TANK_RADIUS, Math.min(arenaHeight - TANK_RADIUS, tank.y));
    }

    // Handle shooting
    if (input.shoot && now - tank.lastShootTime > SHOOT_COOLDOWN) {
      const bulletId = `${playerId}_${Date.now()}`;
      const bulletVx = Math.cos(tank.angle) * BULLET_SPEED;
      const bulletVy = Math.sin(tank.angle) * BULLET_SPEED;

      state.bullets[bulletId] = {
        x: tank.x + Math.cos(tank.angle) * TANK_RADIUS,
        y: tank.y + Math.sin(tank.angle) * TANK_RADIUS,
        vx: bulletVx,
        vy: bulletVy,
        ownerPlayerId: playerId,
        createdAt: now,
      };

      tank.lastShootTime = now;
    }
  });

  // Update bullet positions and remove old ones
  const bulletsToRemove = [];
  Object.entries(state.bullets).forEach(([bulletId, bullet]) => {
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;

    // Check if bullet is out of bounds
    if (
      bullet.x < -BULLET_RADIUS ||
      bullet.x > arenaWidth + BULLET_RADIUS ||
      bullet.y < -BULLET_RADIUS ||
      bullet.y > arenaHeight + BULLET_RADIUS ||
      now - bullet.createdAt > 10000 // 10 second max lifetime
    ) {
      bulletsToRemove.push(bulletId);
    }
  });

  bulletsToRemove.forEach((id) => {
    delete state.bullets[id];
  });

  // Collision detection: bullets vs tanks
  Object.entries(state.bullets).forEach(([bulletId, bullet]) => {
    Object.entries(state.tanks).forEach(([tankId, tank]) => {
      if (!tank.alive || bullet.ownerPlayerId === tankId) return;

      const dx = bullet.x - tank.x;
      const dy = bullet.y - tank.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < TANK_RADIUS + BULLET_RADIUS) {
        // Hit!
        tank.hp--;
        if (tank.hp <= 0) {
          tank.alive = false;
        }
        delete state.bullets[bulletId];
      }
    });
  });

  return state;
}

/**
 * Detect if there's a winner (only one tank alive).
 * @param {Object} state - Game state
 * @returns {string|null} Winner playerId or null
 */
export function detectWinner(state) {
  const aliveTanks = Object.entries(state.tanks).filter(([_, tank]) => tank.alive);

  if (aliveTanks.length === 1) {
    return aliveTanks[0][0];
  }

  return null;
}

/**
 * Get all alive players' tank IDs.
 * @param {Object} state - Game state
 * @returns {string[]}
 */
export function getAliveTankIds(state) {
  return Object.entries(state.tanks)
    .filter(([_, tank]) => tank.alive)
    .map(([id]) => id);
}
