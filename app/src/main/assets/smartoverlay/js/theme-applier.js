export function applyThemeVariables(root,theme={}){const el=root||document.documentElement;Object.entries(theme.variables||{}).forEach(([k,v])=>el.style.setProperty(k,v));return theme.variables||{}}
export default applyThemeVariables;
