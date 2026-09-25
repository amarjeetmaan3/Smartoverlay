const KEY="smartOverlay.scenes.v2";
export function saveScenes(scenes){try{localStorage.setItem(KEY,JSON.stringify(scenes));return true}catch{return false}}
export function loadScenes(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
export function clearScenes(){try{localStorage.removeItem(KEY)}catch{}}
export default{saveScenes,loadScenes,clearScenes};
