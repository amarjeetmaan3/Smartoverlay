export class SceneSwitcher {
  constructor(onSwitch=()=>{}){this.onSwitch=onSwitch;this.active=null}
  switchTo(scene){this.active=scene?.id||null;return this.onSwitch(scene)}
}
export default SceneSwitcher;
