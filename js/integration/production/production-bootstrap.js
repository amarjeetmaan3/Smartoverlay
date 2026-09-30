import { startProduction } from "./production-controller.js";

const file = (location.pathname.split("/").pop() || "").toLowerCase();
const mode = file.startsWith("overlay") ? "overlay" : "controller";

startProduction({ mode }).catch((error) => {
  console.error(error);
  const box = document.getElementById("bootError");
  const status = document.getElementById("bootStatus");
  if (status) status.style.display = "none";
  if (box) {
    box.style.display = "block";
    box.textContent = "SMARTOVERLAY START ERROR\n\n" + (error && error.stack ? error.stack : String(error));
  }
});
