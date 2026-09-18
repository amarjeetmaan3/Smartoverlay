const shortcuts = new Map();
export function registerShortcut(key, callback) {
  shortcuts.set(key.toLowerCase(), callback);
}
export function unregisterShortcut(key) {
  shortcuts.delete(key.toLowerCase());
}
window.addEventListener("keydown", event => {
  const parts = [];
  if (event.ctrlKey || event.metaKey) parts.push("ctrl");
  if (event.shiftKey) parts.push("shift");
  if (event.altKey) parts.push("alt");
  parts.push(event.key.toLowerCase());
  const callback = shortcuts.get(parts.join("+"));
  if (callback) {
    event.preventDefault();
    callback(event);
  }
});
export const keyboard = { registerShortcut, unregisterShortcut };
window.smartOverlayKeyboard = keyboard;
