import { startProduction } from "./production-controller.js";

// mode सिर्फ फाइल के नाम से तय होगा (पूरे पाथ से नहीं), क्योंकि
// "/Smartoverlay/controller.html" के पाथ में भी "overlay" आता है।
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
