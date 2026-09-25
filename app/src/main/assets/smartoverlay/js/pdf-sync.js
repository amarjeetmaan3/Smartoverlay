export function createPdfState(data = {}) {
  return { url: data.url || "", page: Math.max(1, Number(data.page) || 1), zoom: Number(data.zoom) || 1, fitMode: data.fitMode || "box", updatedAt: Date.now() };
}
export default createPdfState;
