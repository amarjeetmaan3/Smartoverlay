export class SceneLiveController {
  constructor(publish=()=>{}){this.publish=publish}
  live(scene){const e={type:"SCENE_LIVE",sceneId:scene?.id,timestamp:Date.now()};this.publish(e);return e}
}
export default SceneLiveController;
