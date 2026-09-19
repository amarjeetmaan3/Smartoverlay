export function updateTemplate(t,patch={}){if(!t)return null;Object.assign(t,patch);t.updatedAt=Date.now();return t}
export default updateTemplate;
