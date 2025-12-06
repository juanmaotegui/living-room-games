/**
 * Small DOM utility helpers.
 */

/**
 * Query selector wrapper.
 * @param {string} selector
 * @param {HTMLElement} root
 * @returns {HTMLElement|null}
 */
export function qs(selector, root = document) {
  return root.querySelector(selector);
}

/**
 * Query selector all wrapper.
 * @param {string} selector
 * @param {HTMLElement} root
 * @returns {NodeList}
 */
export function qsa(selector, root = document) {
  return root.querySelectorAll(selector);
}

/**
 * Add event listener.
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {Function} handler
 */
export function on(element, eventName, handler) {
  if (element) {
    element.addEventListener(eventName, handler);
  }
}

/**
 * Remove event listener.
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {Function} handler
 */
export function off(element, eventName, handler) {
  if (element) {
    element.removeEventListener(eventName, handler);
  }
}

/**
 * Show element.
 * @param {HTMLElement} element
 */
export function show(element) {
  if (element) {
    element.classList.remove("hidden");
  }
}

/**
 * Hide element.
 * @param {HTMLElement} element
 */
export function hide(element) {
  if (element) {
    element.classList.add("hidden");
  }
}

/**
 * Toggle visibility.
 * @param {HTMLElement} element
 * @param {boolean} visible
 */
export function setVisible(element, visible) {
  if (visible) {
    show(element);
  } else {
    hide(element);
  }
}

/**
 * Set text content.
 * @param {HTMLElement} element
 * @param {string} text
 */
export function setText(element, text) {
  if (element) {
    element.textContent = text;
  }
}

/**
 * Create an HTML element with optional class and text.
 * @param {string} tag
 * @param {Object} options - { class, text, id, html }
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.class) el.className = options.class;
  if (options.id) el.id = options.id;
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  return el;
}

/**
 * Copy text to clipboard.
 * @param {string} text
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
