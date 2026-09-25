export function validateScene(scene={}){const errors=[];if(!scene.id)errors.push("Scene id is required");if(!scene.name)errors.push("Scene name is required");return{valid:!errors.length,errors}}
export default validateScene;
