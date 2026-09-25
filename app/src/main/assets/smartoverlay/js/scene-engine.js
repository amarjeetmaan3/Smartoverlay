export class SceneEngine {
  constructor(){this.current=null}
  load(scene){this.current=structuredClone(scene);return this.current}
  update(p={}){if(!this.current)return null;Object.assign(this.current,p);return this.current}
  clear(){this.current=null}
  get(){return this.current?structuredClone(this.current):null}
}
export default SceneEngine;
