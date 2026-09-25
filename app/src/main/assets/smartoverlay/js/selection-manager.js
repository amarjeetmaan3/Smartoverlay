let ids=[],primaryId=null;
export function select(id,{add=false}={}){if(!id)return clearSelection();ids=add?[...new Set([...ids,id])]:[id];primaryId=id;emit();return getSelection();}
export function toggle(id){ids.includes(id)?ids=ids.filter(x=>x!==id):(ids.push(id),primaryId=id);if(!ids.includes(primaryId))primaryId=ids.at(-1)||null;emit();return getSelection();}
export function clearSelection(){ids=[];primaryId=null;emit();return getSelection();}
export function isSelected(id){return ids.includes(id);}
export function getSelectedIds(){return [...ids];}
export function getPrimaryId(){return primaryId;}
export function getSelection(){return{ids:[...ids],primaryId};}
function emit(){window.dispatchEvent(new CustomEvent("smartoverlay:selection-change",{detail:getSelection()}));}
window.smartOverlaySelection={select,toggle,clearSelection,isSelected,getSelectedIds,getPrimaryId,getSelection};
