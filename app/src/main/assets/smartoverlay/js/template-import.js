export function importTemplate(v){const x=typeof v==="string"?JSON.parse(v):v;if(!x||typeof x!=="object")throw new Error("Invalid template");return x}
export default importTemplate;
