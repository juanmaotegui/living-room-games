/**
 * Registry of available games.
 * Easy to extend with new games.
 */

export const GAMES = {
  tanks: {
    id: "tanks",
    name: "Tanks War",
    description: "Control your tank and destroy enemies",
    minPlayers: 2,
    maxPlayers: 6,
  },
};

/**
 * Get a list of available game IDs.
 * @returns {string[]}
 */
export function getAvailableGameIds() {
  return Object.keys(GAMES);
}

/**
 * Get game info by ID.
 * @param {string} gameId
 * @returns {Object|null}
 */
export function getGameInfo(gameId) {
  return GAMES[gameId] || null;
}

/**
 * Check if a game ID is valid.
 * @param {string} gameId
 * @returns {boolean}
 */
export function isValidGameId(gameId) {
  return gameId in GAMES;
}
