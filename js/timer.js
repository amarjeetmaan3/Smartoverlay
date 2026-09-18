let timer = {
  duration: 0,
  remaining: 0,
  running: false,
  paused: false,
  startedAt: null,
  interval: null
};

function emit() {
  window.dispatchEvent(
    new CustomEvent("smartoverlay:timer", {
      detail: getTimer()
    })
  );
}

export function getTimer() {
  return {
    duration: timer.duration,
    remaining: timer.remaining,
    running: timer.running,
    paused: timer.paused
  };
}

export function setTimer(seconds) {
  stopTimer();

  const value = Math.max(
    0,
    Number(seconds) || 0
  );

  timer.duration = value;
  timer.remaining = value;
  timer.paused = false;

  emit();

  return getTimer();
}

export function startTimer() {
  if (timer.remaining <= 0) {
    return getTimer();
  }

  if (timer.running) {
    return getTimer();
  }

  timer.running = true;
  timer.paused = false;
  timer.startedAt = Date.now();

  timer.interval = setInterval(tick, 250);

  emit();

  return getTimer();
}

export function pauseTimer() {
  if (!timer.running) {
    return getTimer();
  }

  timer.running = false;
  timer.paused = true;

  clearInterval(timer.interval);
  timer.interval = null;

  emit();

  return getTimer();
}

export function resumeTimer() {
  if (!timer.paused) {
    return startTimer();
  }

  return startTimer();
}

export function stopTimer() {
  clearInterval(timer.interval);

  timer.interval = null;
  timer.running = false;
  timer.paused = false;
  timer.startedAt = null;

  return getTimer();
}

export function resetTimer() {
  stopTimer();

  timer.remaining = timer.duration;

  emit();

  return getTimer();
}

function tick() {
  if (!timer.running) return;

  const elapsed =
    Math.floor(
      (Date.now() - timer.startedAt) /
        1000
    );

  const remaining =
    Math.max(
      0,
      timer.remaining - elapsed
    );

  timer.remaining = remaining;
  timer.startedAt = Date.now();

  emit();

  if (timer.remaining <= 0) {
    timer.running = false;
    timer.paused = false;

    clearInterval(timer.interval);
    timer.interval = null;

    window.dispatchEvent(
      new CustomEvent(
        "smartoverlay:timer-finished"
      )
    );

    emit();
  }
}

export function formatTime(seconds) {
  const value = Math.max(
    0,
    Math.floor(
      Number(seconds) || 0
    )
  );

  const hours =
    Math.floor(value / 3600);

  const minutes =
    Math.floor(
      (value % 3600) / 60
    );

  const secs =
    value % 60;

  if (hours > 0) {
    return [
      hours,
      minutes,
      secs
    ]
      .map(
        (part) =>
          String(part).padStart(2, "0")
      )
      .join(":");
  }

  return [
    minutes,
    secs
  ]
    .map(
      (part) =>
        String(part).padStart(2, "0")
    )
    .join(":");
}

window.smartOverlayTimer = {
  getTimer,
  setTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
  stopTimer,
  resetTimer,
  formatTime
};

console.log(
  "SmartOverlay Timer initialized"
);
