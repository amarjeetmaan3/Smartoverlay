import { startProduction } from "./production-controller.js";
const mode=location.pathname.toLowerCase().includes("overlay")?"overlay":"controller";
startProduction({mode}).catch(console.error);