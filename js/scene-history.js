export class SceneHistory {
  constructor(limit=50){this.limit=limit;this.items=[];this.index=-1}
  push(scene){this.items=this.items.slice(0,this.index+1);this.items.push(structuredClone(scene));if(this.items.length>this.limit)this.items.shift();this.index=this.items.length-1}
  undo(){if(this.index<=0)return null;return structuredClone(this.items[--this.index])}
  redo(){if(this.index>=this.items.length-1)return null;return structuredClone(this.items[++this.index])}
}
export default SceneHistory;
