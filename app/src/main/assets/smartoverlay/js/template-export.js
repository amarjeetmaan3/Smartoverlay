export function exportTemplate(t){return JSON.stringify(t,null,2)}
export function exportTemplateBlob(t){return new Blob([exportTemplate(t)],{type:"application/json"})}
export default exportTemplate;
