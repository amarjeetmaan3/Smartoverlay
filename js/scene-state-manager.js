export class SceneStateManager {
  constructor(){this.state={activeScene:null,live:false,transition:"cut"}}
  set(p={}){Object.assign(this.state,p);return this.get()}
  get(){return structuredClone(this.state)}
  reset(){this.state={activeScene:null,live:false,transition:"cut"};return this.get()}
}
export default SceneStateManager;
