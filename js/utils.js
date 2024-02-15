/**
 *
 * @param {string} url
 * @param {RequestInit} [options]
 */
async function request(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return response.json();
}

/**
 * @template {Function} T
 * @param {T} callback
 * @param {number} delay
 * @returns {T}
 */
function throttle(callback, delay = 500) {
  let timeoutId;
  let lastCallTime;

  // @ts-ignore
  return (...args) => {
    const elapsedTime = Date.now() - lastCallTime;
    const newDelay = Math.max(delay - elapsedTime, 0);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
      lastCallTime = Date.now();
    }, newDelay);
  };
}

export {
  throttle,
  request
};
