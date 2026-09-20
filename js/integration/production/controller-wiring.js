import { createSmartOverlayController } from "../../controller-engine-v2.js";
import * as Layout from "../../layout-engine.js";
import * as Boxes from "../../box-manager.js";
import * as Scenes from "../../scene-manager.js";
import * as Questions from "../../question-engine.js";
import * as Quiz from "../../quiz-engine.js";
import * as Timer from "../../timer.js";
import { liveState } from "../firebase/live-state.js";
import { liveCommands } from "../firebase/live-commands.js";

export async function wireController(state) {
  const root = document.getElementById("controllerApp");
  if (!root) return;

  root.innerHTML = `
    <section class="production-panel">
      <div class="production-header">
        <div>
          <h2>SmartOverlay Live Control Room</h2>
          <p id="liveSummary">Connecting to Firebase…</p>
        </div>
        <span id="connectionStatus">● Connecting</span>
      </div>

      <div class="control-grid">
        <button data-action="question">Question</button>
        <button data-action="answer">Answer</button>
        <button data-action="explanation">Explanation</button>
        <button data-action="next">Next</button>
        <button data-action="previous">Previous</button>
        <button data-action="clear">Clear Overlay</button>
      </div>

      <div class="production-section">
        <h3>Live Text</h3>
        <textarea id="liveText" rows="4" placeholder="Enter text for overlay…"></textarea>
        <button id="sendText">Send to Overlay</button>
      </div>

      <div class="production-section">
        <h3>Timer</h3>
        <div class="timer-controls">
          <input id="timerSeconds" type="number" min="0" value="60">
          <button data-timer="start">Start</button>
          <button data-timer="pause">Pause</button>
          <button data-timer="reset">Reset</button>
        </div>
      </div>

      <div class="production-section">
        <h3>Scenes</h3>
        <button id="saveScene">Save Current Scene</button>
        <button id="loadScene">Load Active Scene</button>
      </div>
    </section>
  `;

  const controller = createSmartOverlayController({
    root: document.getElementById("smartOverlayController")
  });

  state.controller = controller;

  const publish = async (content = {}) => {
    await liveState.patch({
      content,
      updatedAt: { ".sv": "timestamp" }
    });
  };

  root.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;

      if (action === "next") {
        Questions.nextQuestion?.();
        await liveCommands.send("question-next");
      }

      if (action === "previous") {
        Questions.previousQuestion?.();
        await liveCommands.send("question-previous");
      }

      if (action === "question") {
        const q = Questions.getCurrentQuestion?.();
        if (q) await publish({ type: "question", question: q });
      }

      if (action === "answer") {
        const q = Questions.getCurrentQuestion?.();
        if (q) await publish({
          type: "answer",
          question: q.question,
          answer: q.answer ?? q.correctAnswer
        });
      }

      if (action === "explanation") {
        const q = Questions.getCurrentQuestion?.();
        if (q) await publish({
          type: "explanation",
          explanation: q.explanation ?? ""
        });
      }

      if (action === "clear") {
        await publish({ type: "clear" });
      }
    });
  });

  document.getElementById("sendText")?.addEventListener("click", async () => {
    const text = document.getElementById("liveText").value.trim();
    if (text) await publish({ type: "text", text });
  });

  root.querySelectorAll("[data-timer]").forEach(button => {
    button.addEventListener("click", async () => {
      const action = button.dataset.timer;

      if (action === "start") {
        const seconds = Math.max(
          0,
          Number(document.getElementById("timerSeconds").value) || 0
        );
        Timer.setTimer(seconds);
        Timer.startTimer();
        await liveCommands.send("timer-start", { seconds });
      }

      if (action === "pause") {
        Timer.pauseTimer();
        await liveCommands.send("timer-pause");
      }

      if (action === "reset") {
        Timer.resetTimer();
        await liveCommands.send("timer-reset");
      }
    });
  });

  document.getElementById("saveScene")?.addEventListener("click", async () => {
    const layout = Layout.getLayout?.();
    const scene = Scenes.saveSceneState?.(layout);
    await liveState.patch({ scene });
  });

  document.getElementById("loadScene")?.addEventListener("click", async () => {
    const scene = Scenes.getActiveScene?.();
    if (scene?.layout) Layout.loadLayout?.(scene.layout);
    await liveCommands.send("scene-load", { sceneId: scene?.id ?? null });
  });

  state.on("live-state", data => {
    const summary = document.getElementById("liveSummary");
    const status = document.getElementById("connectionStatus");

    if (summary) summary.textContent = "Firebase realtime connection active.";
    if (status) {
      status.textContent = "● Connected";
      status.dataset.connected = "true";
    }

    controller.state.patch({
      connection: "connected",
      liveData: data
    });
  });

  return controller;
}
