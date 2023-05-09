import{g as t,a as e}from"../ssr-window/ssr-window.4d6020fc.js";class n extends Array{constructor(t){"number"==typeof t?super(t):(super(...t||[]),function(t){const e=t.__proto__;Object.defineProperty(t,"__proto__",{get:()=>e,set(t){e.__proto__=t}})}(this))}}function i(t=[]){const e=[];return t.forEach((t=>{Array.isArray(t)?e.push(...i(t)):e.push(t)})),e}function s(t,e){return Array.prototype.filter.call(t,e)}function r(i,s){const r=t(),o=e();let l=[];if(!s&&i instanceof n)return i;if(!i)return new n(l);if("string"==typeof i){const t=i.trim();if(t.indexOf("<")>=0&&t.indexOf(">")>=0){let e="div";0===t.indexOf("<li")&&(e="ul"),0===t.indexOf("<tr")&&(e="tbody"),0!==t.indexOf("<td")&&0!==t.indexOf("<th")||(e="tr"),0===t.indexOf("<tbody")&&(e="table"),0===t.indexOf("<option")&&(e="select");const n=o.createElement(e);n.innerHTML=t;for(let t=0;t<n.childNodes.length;t+=1)l.push(n.childNodes[t])}else l=function(t,e){if("string"!=typeof t)return[t];const n=[],i=e.querySelectorAll(t);for(let s=0;s<i.length;s+=1)n.push(i[s]);return n}(i.trim(),s||o)}else if(i.nodeType||i===r||i===o)l.push(i);else if(Array.isArray(i)){if(i instanceof n)return i;l=i}return new n(function(t){const e=[];for(let n=0;n<t.length;n+=1)-1===e.indexOf(t[n])&&e.push(t[n]);return e}(l))}function o(...t){const e=i(t.map((t=>t.split(" "))));return this.forEach((t=>{t.classList.add(...e)})),this}function l(...t){const e=i(t.map((t=>t.split(" "))));return this.forEach((t=>{t.classList.remove(...e)})),this}function h(...t){const e=i(t.map((t=>t.split(" "))));this.forEach((t=>{e.forEach((e=>{t.classList.toggle(e)}))}))}function f(...t){const e=i(t.map((t=>t.split(" "))));return s(this,(t=>e.filter((e=>t.classList.contains(e))).length>0)).length>0}function u(t,e){if(1===arguments.length&&"string"==typeof t)return this[0]?this[0].getAttribute(t):void 0;for(let n=0;n<this.length;n+=1)if(2===arguments.length)this[n].setAttribute(t,e);else for(const e in t)this[n][e]=t[e],this[n].setAttribute(e,t[e]);return this}function c(t){for(let e=0;e<this.length;e+=1)this[e].removeAttribute(t);return this}function a(t){for(let e=0;e<this.length;e+=1)this[e].style.transform=t;return this}function p(t){for(let e=0;e<this.length;e+=1)this[e].style.transitionDuration="string"!=typeof t?`${t}ms`:t;return this}function d(...t){let[e,n,i,s]=t;function o(t){const e=t.target;if(!e)return;const s=t.target.dom7EventData||[];if(s.indexOf(t)<0&&s.unshift(t),r(e).is(n))i.apply(e,s);else{const t=r(e).parents();for(let e=0;e<t.length;e+=1)r(t[e]).is(n)&&i.apply(t[e],s)}}function l(t){const e=t&&t.target&&t.target.dom7EventData||[];e.indexOf(t)<0&&e.unshift(t),i.apply(this,e)}"function"==typeof t[1]&&([e,i,s]=t,n=void 0),s||(s=!1);const h=e.split(" ");let f;for(let r=0;r<this.length;r+=1){const t=this[r];if(n)for(f=0;f<h.length;f+=1){const e=h[f];t.dom7LiveListeners||(t.dom7LiveListeners={}),t.dom7LiveListeners[e]||(t.dom7LiveListeners[e]=[]),t.dom7LiveListeners[e].push({listener:i,proxyListener:o}),t.addEventListener(e,o,s)}else for(f=0;f<h.length;f+=1){const e=h[f];t.dom7Listeners||(t.dom7Listeners={}),t.dom7Listeners[e]||(t.dom7Listeners[e]=[]),t.dom7Listeners[e].push({listener:i,proxyListener:l}),t.addEventListener(e,l,s)}}return this}function g(...t){let[e,n,i,s]=t;"function"==typeof t[1]&&([e,i,s]=t,n=void 0),s||(s=!1);const r=e.split(" ");for(let o=0;o<r.length;o+=1){const t=r[o];for(let e=0;e<this.length;e+=1){const r=this[e];let o;if(!n&&r.dom7Listeners?o=r.dom7Listeners[t]:n&&r.dom7LiveListeners&&(o=r.dom7LiveListeners[t]),o&&o.length)for(let e=o.length-1;e>=0;e-=1){const n=o[e];i&&n.listener===i||i&&n.listener&&n.listener.dom7proxy&&n.listener.dom7proxy===i?(r.removeEventListener(t,n.proxyListener,s),o.splice(e,1)):i||(r.removeEventListener(t,n.proxyListener,s),o.splice(e,1))}}}return this}function m(...e){const n=t(),i=e[0].split(" "),s=e[1];for(let t=0;t<i.length;t+=1){const r=i[t];for(let t=0;t<this.length;t+=1){const i=this[t];if(n.CustomEvent){const t=new n.CustomEvent(r,{detail:s,bubbles:!0,cancelable:!0});i.dom7EventData=e.filter(((t,e)=>e>0)),i.dispatchEvent(t),i.dom7EventData=[],delete i.dom7EventData}}}return this}function y(t){const e=this;return t&&e.on("transitionend",(function n(i){i.target===this&&(t.call(this,i),e.off("transitionend",n))})),this}function v(t){if(this.length>0){if(t){const t=this.styles();return this[0].offsetWidth+parseFloat(t.getPropertyValue("margin-right"))+parseFloat(t.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null}function L(t){if(this.length>0){if(t){const t=this.styles();return this[0].offsetHeight+parseFloat(t.getPropertyValue("margin-top"))+parseFloat(t.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null}function E(){if(this.length>0){const n=t(),i=e(),s=this[0],r=s.getBoundingClientRect(),o=i.body,l=s.clientTop||o.clientTop||0,h=s.clientLeft||o.clientLeft||0,f=s===n?n.scrollY:s.scrollTop,u=s===n?n.scrollX:s.scrollLeft;return{top:r.top+f-l,left:r.left+u-h}}return null}function b(){const e=t();return this[0]?e.getComputedStyle(this[0],null):{}}function x(e,n){const i=t();let s;if(1===arguments.length){if("string"!=typeof e){for(s=0;s<this.length;s+=1)for(const t in e)this[s].style[t]=e[t];return this}if(this[0])return i.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(s=0;s<this.length;s+=1)this[s].style[e]=n;return this}return this}function S(t){return t?(this.forEach(((e,n)=>{t.apply(e,[e,n])})),this):this}function N(t){return r(s(this,t))}function C(t){if(void 0===t)return this[0]?this[0].innerHTML:null;for(let e=0;e<this.length;e+=1)this[e].innerHTML=t;return this}function A(t){if(void 0===t)return this[0]?this[0].textContent.trim():null;for(let e=0;e<this.length;e+=1)this[e].textContent=t;return this}function O(i){const s=t(),o=e(),l=this[0];let h,f;if(!l||void 0===i)return!1;if("string"==typeof i){if(l.matches)return l.matches(i);if(l.webkitMatchesSelector)return l.webkitMatchesSelector(i);if(l.msMatchesSelector)return l.msMatchesSelector(i);for(h=r(i),f=0;f<h.length;f+=1)if(h[f]===l)return!0;return!1}if(i===o)return l===o;if(i===s)return l===s;if(i.nodeType||i instanceof n){for(h=i.nodeType?[i]:i,f=0;f<h.length;f+=1)if(h[f]===l)return!0;return!1}return!1}function T(){let t,e=this[0];if(e){for(t=0;null!==(e=e.previousSibling);)1===e.nodeType&&(t+=1);return t}}function _(t){if(void 0===t)return this;const e=this.length;if(t>e-1)return r([]);if(t<0){const n=e+t;return r(n<0?[]:[this[n]])}return r([this[t]])}function w(...t){let i;const s=e();for(let e=0;e<t.length;e+=1){i=t[e];for(let t=0;t<this.length;t+=1)if("string"==typeof i){const e=s.createElement("div");for(e.innerHTML=i;e.firstChild;)this[t].appendChild(e.firstChild)}else if(i instanceof n)for(let e=0;e<i.length;e+=1)this[t].appendChild(i[e]);else this[t].appendChild(i)}return this}function M(t){const i=e();let s,r;for(s=0;s<this.length;s+=1)if("string"==typeof t){const e=i.createElement("div");for(e.innerHTML=t,r=e.childNodes.length-1;r>=0;r-=1)this[s].insertBefore(e.childNodes[r],this[s].childNodes[0])}else if(t instanceof n)for(r=0;r<t.length;r+=1)this[s].insertBefore(t[r],this[s].childNodes[0]);else this[s].insertBefore(t,this[s].childNodes[0]);return this}function H(t){return this.length>0?t?this[0].nextElementSibling&&r(this[0].nextElementSibling).is(t)?r([this[0].nextElementSibling]):r([]):this[0].nextElementSibling?r([this[0].nextElementSibling]):r([]):r([])}function D(t){const e=[];let n=this[0];if(!n)return r([]);for(;n.nextElementSibling;){const i=n.nextElementSibling;t?r(i).is(t)&&e.push(i):e.push(i),n=i}return r(e)}function P(t){if(this.length>0){const e=this[0];return t?e.previousElementSibling&&r(e.previousElementSibling).is(t)?r([e.previousElementSibling]):r([]):e.previousElementSibling?r([e.previousElementSibling]):r([])}return r([])}function B(t){const e=[];let n=this[0];if(!n)return r([]);for(;n.previousElementSibling;){const i=n.previousElementSibling;t?r(i).is(t)&&e.push(i):e.push(i),n=i}return r(e)}function F(t){const e=[];for(let n=0;n<this.length;n+=1)null!==this[n].parentNode&&(t?r(this[n].parentNode).is(t)&&e.push(this[n].parentNode):e.push(this[n].parentNode));return r(e)}function V(t){const e=[];for(let n=0;n<this.length;n+=1){let i=this[n].parentNode;for(;i;)t?r(i).is(t)&&e.push(i):e.push(i),i=i.parentNode}return r(e)}function q(t){let e=this;return void 0===t?r([]):(e.is(t)||(e=e.parents(t).eq(0)),e)}function j(t){const e=[];for(let n=0;n<this.length;n+=1){const i=this[n].querySelectorAll(t);for(let t=0;t<i.length;t+=1)e.push(i[t])}return r(e)}function k(t){const e=[];for(let n=0;n<this.length;n+=1){const i=this[n].children;for(let n=0;n<i.length;n+=1)t&&!r(i[n]).is(t)||e.push(i[n])}return r(e)}function W(){for(let t=0;t<this.length;t+=1)this[t].parentNode&&this[t].parentNode.removeChild(this[t]);return this}r.fn=n.prototype;export{r as $,D as A,P as B,B as C,F as D,V as E,q as F,j as G,k as H,N as I,W as J,o as a,u as b,c,a as d,p as e,g as f,m as g,f as h,y as i,v as j,L as k,E as l,x as m,S as n,d as o,C as p,A as q,l as r,b as s,h as t,O as u,T as v,_ as w,w as x,M as y,H as z};
