import{c as t}from"../form-data/form-data.01cb563f.js";var n={exports:{}};const e=n.exports=function(){var t,n,e={version:"0.2.0"},r=e.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function i(t,n,e){return t<n?n:t>e?e:t}function s(t){return 100*(-1+t)}function o(t,n,e){var i;return(i="translate3d"===r.positionUsing?{transform:"translate3d("+s(t)+"%,0,0)"}:"translate"===r.positionUsing?{transform:"translate("+s(t)+"%,0)"}:{"margin-left":s(t)+"%"}).transition="all "+n+"ms "+e,i}e.configure=function(t){var n,e;for(n in t)void 0!==(e=t[n])&&t.hasOwnProperty(n)&&(r[n]=e);return this},e.status=null,e.set=function(t){var n=e.isStarted();t=i(t,r.minimum,1),e.status=1===t?null:t;var s=e.render(!n),c=s.querySelector(r.barSelector),l=r.speed,f=r.easing;return s.offsetWidth,a((function(n){""===r.positionUsing&&(r.positionUsing=e.getPositioningCSS()),u(c,o(t,l,f)),1===t?(u(s,{transition:"none",opacity:1}),s.offsetWidth,setTimeout((function(){u(s,{transition:"all "+l+"ms linear",opacity:0}),setTimeout((function(){e.remove(),n()}),l)}),l)):setTimeout(n,l)})),this},e.isStarted=function(){return"number"==typeof e.status},e.start=function(){e.status||e.set(0);var t=function(){setTimeout((function(){e.status&&(e.trickle(),t())}),r.trickleSpeed)};return r.trickle&&t(),this},e.done=function(t){return t||e.status?e.inc(.3+.5*Math.random()).set(1):this},e.inc=function(t){var n=e.status;return n?("number"!=typeof t&&(t=(1-n)*i(Math.random()*n,.1,.95)),n=i(n+t,0,.994),e.set(n)):e.start()},e.trickle=function(){return e.inc(Math.random()*r.trickleRate)},t=0,n=0,e.promise=function(r){return r&&"resolved"!==r.state()?(0===n&&e.start(),t++,n++,r.always((function(){0==--n?(t=0,e.done()):e.set((t-n)/t)})),this):this},e.render=function(t){if(e.isRendered())return document.getElementById("nprogress");l(document.documentElement,"nprogress-busy");var n=document.createElement("div");n.id="nprogress",n.innerHTML=r.template;var i,o=n.querySelector(r.barSelector),a=t?"-100":s(e.status||0),c=document.querySelector(r.parent);return u(o,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),r.showSpinner||(i=n.querySelector(r.spinnerSelector))&&d(i),c!=document.body&&l(c,"nprogress-custom-parent"),c.appendChild(n),n},e.remove=function(){f(document.documentElement,"nprogress-busy"),f(document.querySelector(r.parent),"nprogress-custom-parent");var t=document.getElementById("nprogress");t&&d(t)},e.isRendered=function(){return!!document.getElementById("nprogress")},e.getPositioningCSS=function(){var t=document.body.style,n="WebkitTransform"in t?"Webkit":"MozTransform"in t?"Moz":"msTransform"in t?"ms":"OTransform"in t?"O":"";return n+"Perspective"in t?"translate3d":n+"Transform"in t?"translate":"margin"};var a=function(){var t=[];function n(){var e=t.shift();e&&e(n)}return function(e){t.push(e),1==t.length&&n()}}(),u=function(){var t=["Webkit","O","Moz","ms"],n={};function e(t){return t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(t,n){return n.toUpperCase()}))}function r(n){var e=document.body.style;if(n in e)return n;for(var r,i=t.length,s=n.charAt(0).toUpperCase()+n.slice(1);i--;)if((r=t[i]+s)in e)return r;return n}function i(t){return t=e(t),n[t]||(n[t]=r(t))}function s(t,n,e){n=i(n),t.style[n]=e}return function(t,n){var e,r,i=arguments;if(2==i.length)for(e in n)void 0!==(r=n[e])&&n.hasOwnProperty(e)&&s(t,e,r);else s(t,i[1],i[2])}}();function c(t,n){return("string"==typeof t?t:m(t)).indexOf(" "+n+" ")>=0}function l(t,n){var e=m(t),r=e+n;c(e,n)||(t.className=r.substring(1))}function f(t,n){var e,r=m(t);c(t,n)&&(e=r.replace(" "+n+" "," "),t.className=e.substring(1,e.length-1))}function m(t){return(" "+(t.className||"")+" ").replace(/\s+/gi," ")}function d(t){t&&t.parentNode&&t.parentNode.removeChild(t)}return e}();export{e as N};
