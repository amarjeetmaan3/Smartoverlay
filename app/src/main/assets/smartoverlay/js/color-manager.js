export function hexToRgba(hex,a=1){let h=hex.replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");const n=parseInt(h,16);return{r:n>>16&255,g:n>>8&255,b:n&255,a};}
export function rgbaToCss({r,g,b,a=1}){return`rgba(${r}, ${g}, ${b}, ${a})`;}
export function normalizeColor(c,a=1){return c?.startsWith("#")?rgbaToCss(hexToRgba(c,a)):c||rgbaToCss({r:0,g:0,b:0,a});}
export function gradient(stops,angle=90){return`linear-gradient(${angle}deg, ${stops.join(", ")})`;}
window.smartOverlayColor={hexToRgba,rgbaToCss,normalizeColor,gradient};
