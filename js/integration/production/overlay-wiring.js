import { renderScene, clearScene } from "../../overlay.js";
import { startUniversalWebOverlay } from "../../web-overlay-engine-v2.js";

export async function wireOverlay(state) {
  const root = document.getElementById("smartOverlayOverlay");
  if (!root) return;

  root.classList.add("smart-overlay-output");

  const render = data => {
    if (!data) return;

    const content = data.content || {};

    if (content.type === "clear") {
      clearScene?.();
      root.replaceChildren();
      return;
    }

    if (data.scene) {
      try {
        renderScene(data.scene);
      } catch (error) {
        console.error("Scene render failed:", error);
      }
    }

    root.replaceChildren();

    if (content.type === "text") {
      const el = document.createElement("div");
      el.className = "overlay-content overlay-text";
      el.textContent = String(content.text || "");
      root.appendChild(el);
      return;
    }

    if (content.type === "question") {
      const wrap = document.createElement("div");
      wrap.className = "overlay-content overlay-question";

      const question = document.createElement("div");
      question.className = "overlay-question-text";
      question.textContent = String(
        content.question?.question || content.question || ""
      );

      wrap.appendChild(question);

      if (Array.isArray(content.question?.options)) {
        const options = document.createElement("div");
        options.className = "overlay-options";

        content.question.options.forEach((option, index) => {
          const item = document.createElement("div");
          item.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
          options.appendChild(item);
        });

        wrap.appendChild(options);
      }

      root.appendChild(wrap);
      return;
    }

    if (content.type === "answer") {
      const el = document.createElement("div");
      el.className = "overlay-content overlay-answer";
      el.textContent = String(content.answer || "");
      root.appendChild(el);
      return;
    }

    if (content.type === "explanation") {
      const el = document.createElement("div");
      el.className = "overlay-content overlay-explanation";
      el.textContent = String(content.explanation || "");
      root.appendChild(el);
    }
  };

  startUniversalWebOverlay({
    root,
    path: "smartOverlay/live",
    onState: data => {
      state.set({ data });
      state.emit("live-state", data || {});
      render(data);
    }
  });

  render(state.get().data);
}
