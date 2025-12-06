/**
 * Simple hash-based router for the app.
 * Routes: #/, #/host, #/player
 */

let currentRoute = null;
let currentUnmount = null;

/**
 * Navigate to a specific hash route.
 * @param {string} hash - The hash route (e.g., "#/host")
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Initialize the router with app controllers.
 * @param {HTMLElement} rootElement - The root element to mount views into
 * @param {Object} controllers - { hostController, playerController }
 */
export function initRouter(rootElement, controllers) {
  const route = () => {
    const hash = window.location.hash.slice(1) || "/";

    // Unmount previous view
    if (currentUnmount) {
      currentUnmount();
      currentUnmount = null;
    }

    rootElement.innerHTML = "";

    if (hash === "/host") {
      currentRoute = "host";
      currentUnmount = controllers.hostController.mount(rootElement);
    } else if (hash === "/player") {
      currentRoute = "player";
      currentUnmount = controllers.playerController.mount(rootElement);
    } else {
      currentRoute = "landing";
      renderLanding(rootElement);
    }
  };

  window.addEventListener("hashchange", route);
  route(); // Initial route
}

/**
 * Render the landing page.
 */
function renderLanding(container) {
  container.innerHTML = `
    <div class="landing-container">
      <h1 class="landing-title">🎮 Living Room Games</h1>
      <p class="landing-subtitle">Play games together on the TV</p>
      <div class="landing-buttons">
        <button id="btn-host" class="primary">Host a Game</button>
        <button id="btn-player" class="primary">Join a Game</button>
      </div>
    </div>
  `;

  document.getElementById("btn-host").addEventListener("click", () => {
    navigateTo("#/host");
  });

  document.getElementById("btn-player").addEventListener("click", () => {
    navigateTo("#/player");
  });
}
