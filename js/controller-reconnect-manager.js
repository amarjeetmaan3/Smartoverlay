export function createReconnectManager({ connect, maxDelay = 30000 } = {}) {
  let stopped = false;
  let delay = 1000;

  async function retry() {
    if (stopped || typeof connect !== "function") return;
    try {
      await connect();
      delay = 1000;
    } catch {
      const wait = delay;
      delay = Math.min(delay * 2, maxDelay);
      setTimeout(retry, wait);
    }
  }

  return {
    start() { stopped = false; retry(); },
    stop() { stopped = true; }
  };
}
