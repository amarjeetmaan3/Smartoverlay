export function updateTheme(theme,patch={}){if(!theme)return null;Object.assign(theme,patch);theme.updatedAt=Date.now();return theme}
export default updateTheme;
