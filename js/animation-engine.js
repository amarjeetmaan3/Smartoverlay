const presets={fade:[{opacity:0},{opacity:1}],slideLeft:[{transform:"translateX(80px)",opacity:0},{transform:"translateX(0)",opacity:1}],slideUp:[{transform:"translateY(80px)",opacity:0},{transform:"translateY(0)",opacity:1}],zoom:[{transform:"scale(.75)",opacity:0},{transform:"scale(1)",opacity:1}]};
export function play(element,config={}){if(!element)return null;const keyframes=presets[config.type]||presets.fade;return element.animate(keyframes,{duration:config.duration??600,delay:config.delay??0,easing:config.easing??"ease",iterations:config.iterations??1,fill:"both"});}
export function getPresets(){return Object.keys(presets);}
window.smartOverlayAnimation={play,getPresets};
