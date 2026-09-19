export async function enterOverlayFullscreen(element=document.documentElement){
  if(element?.requestFullscreen) return element.requestFullscreen();
  return false;
}
export async function exitOverlayFullscreen(){
  if(document.fullscreenElement&&document.exitFullscreen) return document.exitFullscreen();
  return false;
}
