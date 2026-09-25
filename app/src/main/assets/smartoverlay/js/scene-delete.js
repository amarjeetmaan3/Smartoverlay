export function deleteScene(store,id){return !!(store&&id&&typeof store.delete==="function"&&store.delete(id))}
export default deleteScene;
