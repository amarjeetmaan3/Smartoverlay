export function importScene(v){const x=typeof v==="string"?JSON.parse(v):v;if(!x||typeof x!=="object")throw new Error("Invalid scene");return x}
export default importScene;
