import{u as n,i as e,o as t,c as i,r as a,a as r,b as o,d as s,e as u,f as l,n as c,g as d,w as v,h as f,p as h,j as p}from"../@vue/@vue.94aa2a2d.js";var m="undefined"!=typeof window;function w(n){return m?requestAnimationFrame(n):-1}function g(n){w((()=>w(n)))}var y=(n,e)=>({top:0,left:0,right:n,bottom:e,width:n,height:e}),x=e=>{const t=n(e);if(t===window){const n=t.innerWidth,e=t.innerHeight;return y(n,e)}return(null==t?void 0:t.getBoundingClientRect)?t.getBoundingClientRect():y(0,0)};function b(n){const r=e(n,null);if(r){const n=f(),{link:e,unlink:a,internalChildren:o}=r;e(n),t((()=>a(n)));return{parent:r,index:i((()=>o.indexOf(n)))}}return{parent:null,index:a(-1)}}function C(n,e,t){const i=function(n){const e=[],t=n=>{Array.isArray(n)&&n.forEach((n=>{var i;p(n)&&(e.push(n),(null==(i=n.component)?void 0:i.subTree)&&(e.push(n.component.subTree),t(n.component.subTree.children)),n.children&&t(n.children))}))};return t(n),e}(n.subTree.children);t.sort(((n,e)=>i.indexOf(n.vnode)-i.indexOf(e.vnode)));const a=t.map((n=>n.proxy));e.sort(((n,e)=>a.indexOf(n)-a.indexOf(e)))}function M(n){const e=r([]),t=r([]),i=f();return{children:e,linkChildren:a=>{h(n,Object.assign({link:n=>{n.proxy&&(t.push(n),e.push(n.proxy),C(i,e,t))},unlink:n=>{const i=t.indexOf(n);e.splice(i,1),t.splice(i,1)},children:e,internalChildren:t},a))}}}var O,k,T=1e3,A=6e4,E=36e5,L=24*E;function j(n){let e,t,r,l;const c=a(n.time),d=i((()=>{return{total:n=c.value,days:Math.floor(n/L),hours:Math.floor(n%L/E),minutes:Math.floor(n%E/A),seconds:Math.floor(n%A/T),milliseconds:Math.floor(n%T)};var n})),v=()=>{var n;r=!1,n=e,m&&cancelAnimationFrame(n)},f=()=>Math.max(t-Date.now(),0),h=e=>{var t,i;c.value=e,null==(t=n.onChange)||t.call(n,d.value),0===e&&(v(),null==(i=n.onFinish)||i.call(n))},p=()=>{e=w((()=>{r&&(h(f()),c.value>0&&p())}))},g=()=>{e=w((()=>{if(r){const t=f();n=t,e=c.value,(Math.floor(n/1e3)!==Math.floor(e/1e3)||0===t)&&h(t),c.value>0&&g()}var n,e}))},y=()=>{m&&(n.millisecond?p():g())};return o(v),s((()=>{l&&(r=!0,l=!1,y())})),u((()=>{r&&(v(),l=!0)})),{start:()=>{r||(t=Date.now()+c.value,r=!0,y())},pause:v,reset:(e=n.time)=>{v(),c.value=e},current:d}}function N(n){let e;l((()=>{n(),c((()=>{e=!0}))})),s((()=>{e&&n()}))}function B(e,i,a={}){if(!m)return;const{target:r=window,passive:o=!1,capture:s=!1}=a;let l;const c=t=>{const a=n(t);a&&!l&&(a.addEventListener(e,i,{capture:s,passive:o}),l=!0)},f=t=>{const a=n(t);a&&l&&(a.removeEventListener(e,i,s),l=!1)};t((()=>f(r))),u((()=>f(r))),N((()=>c(r))),d(r)&&v(r,((n,e)=>{f(e),c(n)}))}function D(e,t,i={}){if(!m)return;const{eventName:a="click"}=i;B(a,(i=>{(Array.isArray(e)?e:[e]).every((e=>{const t=n(e);return t&&!t.contains(i.target)}))&&t(i)}),{target:document})}function F(){if(!O&&(O=a(0),k=a(0),m)){const n=()=>{O.value=window.innerWidth,k.value=window.innerHeight};n(),window.addEventListener("resize",n,{passive:!0}),window.addEventListener("orientationchange",n,{passive:!0})}return{width:O,height:k}}var H,V=/scroll|auto|overlay/i,W=m?window:void 0;function R(n){return"HTML"!==n.tagName&&"BODY"!==n.tagName&&1===n.nodeType}function S(n,e=W){let t=n;for(;t&&t!==e&&R(t);){const{overflowY:n}=window.getComputedStyle(t);if(V.test(n))return t;t=t.parentNode}return e}function Y(n,e=W){const t=a();return l((()=>{n.value&&(t.value=S(n.value,e))})),t}function q(){if(!H&&(H=a("visible"),m)){const n=()=>{H.value=document.hidden?"hidden":"visible"};n(),window.addEventListener("visibilitychange",n)}return H}var z=Symbol("van-field");function G(n){const t=e(z,null);t&&!t.customValue.value&&(t.customValue.value=n,v(n,(()=>{t.resetValidation(),t.validateWithTrigger("onChange")})))}export{z as C,x as a,M as b,b as c,B as d,Y as e,q as f,S as g,g as h,m as i,G as j,j as k,D as l,N as o,w as r,F as u};