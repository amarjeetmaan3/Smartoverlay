export function validateOverlayConfig(config={}){
  const errors=[];
  if(!config.path||typeof config.path!=="string") errors.push("Firebase overlay path is required");
  if(config.aspect&&!["16:9","9:16","custom"].includes(config.aspect)) errors.push("Invalid aspect ratio");
  return {valid:errors.length===0,errors};
}
