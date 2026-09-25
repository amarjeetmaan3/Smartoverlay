const cameras=new Map();
export async function startCamera(id,{videoElement,video=true,audio=false}={}){if(!videoElement)throw new Error("videoElement is required");const stream=await navigator.mediaDevices.getUserMedia({video,audio});videoElement.srcObject=stream;videoElement.autoplay=true;videoElement.playsInline=true;await videoElement.play().catch(()=>{});cameras.set(id,{id,stream,videoElement});return stream;}
export function stopCamera(id){const c=cameras.get(id);if(!c)return;c.stream.getTracks().forEach(t=>t.stop());c.videoElement.srcObject=null;cameras.delete(id);}
export function getCamera(id){return cameras.get(id)||null;}
window.smartOverlayCamera={startCamera,stopCamera,getCamera};
