let container;
function getContainer(){if(container)return container;container=document.createElement("div");container.id="smartoverlay-notifications";container.style.cssText="position:fixed;right:16px;bottom:16px;z-index:99999;display:flex;flex-direction:column;gap:8px";document.body.appendChild(container);return container;}
export function notify(message,type="info",duration=3000){const el=document.createElement("div");el.textContent=message;el.dataset.type=type;el.style.cssText="padding:12px 16px;border-radius:10px;background:#15151d;color:#fff;border:1px solid #333;font:14px system-ui;box-shadow:0 8px 24px #0005";getContainer().appendChild(el);setTimeout(()=>el.remove(),duration);return el;}
export const success=m=>notify(m,"success"),error=m=>notify(m,"error",5000),warning=m=>notify(m,"warning",4000),info=m=>notify(m);
window.smartOverlayNotify={notify,success,error,warning,info};
