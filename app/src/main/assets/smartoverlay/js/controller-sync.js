export function createControllerSync(publish) {
  return {
    layout: data => publish("layout", data),
    content: data => publish("content", data),
    scene: data => publish("scene", data),
    animation: data => publish("animation", data)
  };
}
export default createControllerSync;
