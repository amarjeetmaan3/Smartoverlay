export function getOverlayUrl(options={}){
  const base=options.baseUrl||`${location.origin}${location.pathname.replace(/[^/]*$/,"")}overlay.html`;
  const url=new URL(base,location.href);
  if(options.session) url.searchParams.set("session",options.session);
  if(options.scene) url.searchParams.set("scene",options.scene);
  if(options.aspect) url.searchParams.set("aspect",options.aspect);
  return url.toString();
}
export function parseOverlayUrl(url=location.href){
  const u=new URL(url,location.href);
  return {session:u.searchParams.get("session"),scene:u.searchParams.get("scene"),aspect:u.searchParams.get("aspect")};
}
