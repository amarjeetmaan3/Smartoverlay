export function createMediaState(data = {}) {
  return { src: data.src || "", visible: data.visible !== false, playing: Boolean(data.playing), currentTime: Number(data.currentTime) || 0, updatedAt: Date.now() };
}
export default createMediaState;
