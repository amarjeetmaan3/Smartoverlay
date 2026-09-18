export function confirmDialog(message,options={}){const ok=window.confirm(message);ok?options.onConfirm?.():options.onCancel?.();return ok;}
export function promptDialog(message,value="",options={}){const result=window.prompt(message,value);if(result!==null)options.onConfirm?.(result);return result;}
export function alertDialog(message){window.alert(message);}
window.smartOverlayModal={confirmDialog,promptDialog,alertDialog};
