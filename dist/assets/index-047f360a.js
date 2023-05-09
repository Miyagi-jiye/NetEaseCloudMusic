import{r as e,p as t,f as o,a3 as n,P as i,a2 as s,$ as r,G as a,N as l}from"../js/@vue/@vue.94aa2a2d.js";import{c as m}from"../js/pinia/pinia.86e899a9.js";import{C as p,L as d}from"../js/vant/vant.52bb3d0f.js";import{c,a as u}from"../js/vue-router/vue-router.b68e67a8.js";import{N as h}from"../js/nprogress/nprogress.6d8e6ba3.js";import{s as f}from"../js/pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";import"../js/@vant/@vant.4990c6ed.js";import"../js/form-data/form-data.01cb563f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const _=(e,t)=>{const o=e.__vccOpts||e;for(const[n,i]of t)o[n]=i;return o},g=_({__name:"App",setup(l){let m=e();const d=e("light");return t("theme",d),o((()=>{localStorage.getItem("api")&&"null"!==localStorage.getItem("api")&&"undefined"!==localStorage.getItem("api")?console.log(`%c当前使用的api为%c|%c${localStorage.getItem("api")}`,"color: #000000;background: #eaeaea;padding: 4px 0 4px 8px;border-radius:4px 0 0 4px;font-weight:bold;border: 1px solid #ff0000;border-width: 1px 0 1px 1px;","color: #f00000;background: #eaeaea;padding: 4px 4px; font-weight: bold;border: 1px solid #ff0000;border-width: 1px 0 1px 0;","color: #000000;background: #eaeaea;padding: 4px 8px 4px 0;border-radius:0 4px 4px 0; font-weight: bold;border: 1px solid #ff0000;border-width: 1px 1px 1px 0;"):(m.value=prompt("请输入您的网易云接口地址，没有可使用我提供的默认接口","https://www.guowei.fun"),localStorage.setItem("api",m.value))})),(e,t)=>{const o=n("RouterView"),l=p;return i(),s(l,{theme:d.value},{default:r((()=>[a(o)])),_:1},8,["theme"])}}},[["__scopeId","data-v-5dd6aa8b"]]),v={},E=function(e,t,o){if(!t||0===t.length)return e();const n=document.getElementsByTagName("link");return Promise.all(t.map((e=>{if(e=function(e,t){return new URL(e,t).href}(e,o),e in v)return;v[e]=!0;const t=e.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(!!o)for(let o=n.length-1;o>=0;o--){const i=n[o];if(i.href===e&&(!t||"stylesheet"===i.rel))return}else if(document.querySelector(`link[href="${e}"]${i}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":"modulepreload",t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((t,o)=>{s.addEventListener("load",t),s.addEventListener("error",(()=>o(new Error(`Unable to preload CSS for ${e}`))))})):void 0}))).then((()=>e()))};h.configure({easing:"ease",speed:500,showSpinner:!1});const j=c({history:u("./"),routes:[{path:"/",name:"layout",component:()=>E((()=>import("../js/layout/index.c0a35037.js")),["..\\js\\layout\\index.c0a35037.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\Audio\\Audio.71320094.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-b717fec9.css","..\\js\\index\\index.ff010ab7.js","./index-c97f11a3.css","..\\js\\fbs\\fbs.f505ac0f.js","..\\js\\user\\user.834cb37b.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-e700729c.css"],import.meta.url),redirect:"/discover",children:[{path:"/discover",name:"discover",component:()=>E((()=>import("../js/discover/index.0d915836.js")),["..\\js\\discover\\index.0d915836.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-ef511358.css"],import.meta.url),meta:{title:"发现页",keepAlive:!0,showHeader:!0,showFooter:!0}},{path:"/follow",name:"follow",component:()=>E((()=>import("../js/follow/index.615ab65c.js")),["..\\js\\follow\\index.615ab65c.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-f7170f15.css"],import.meta.url),meta:{title:"关注页",keepAlive:!0,showHeader:!0,showFooter:!0},children:[{path:"/follow/bilibili",name:"bilibili",component:()=>E((()=>import("../js/bilibili/index.09268ea9.js")),["..\\js\\bilibili\\index.09268ea9.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-30c96cdf.css"],import.meta.url),meta:{title:"bilibili",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/follow/bangumi",name:"bangumi",component:()=>E((()=>import("../js/bangumi/index.3ff84245.js")),["..\\js\\bangumi\\index.3ff84245.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-2a0f6f65.css"],import.meta.url),meta:{title:"bangumi",keepAlive:!0,showHeader:!1,showFooter:!1}}]},{path:"/home",name:"home",component:()=>E((()=>import("../js/home/index.f84e903a.js")),["..\\js\\home\\index.f84e903a.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.21bff93b.js","./index-00c1926a.css","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\fbs\\fbs.f505ac0f.js","..\\js\\user\\user.834cb37b.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-dcdaae09.css"],import.meta.url),meta:{title:"首页",keepAlive:!0,showHeader:!0,showFooter:!0}},{path:"/about",name:"about",component:()=>E((()=>import("../js/about/index.8d56f6d5.js")),["..\\js\\about\\index.8d56f6d5.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-7151695b.css"],import.meta.url),meta:{title:"关于页",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/songListDetail",name:"songListDetail",component:()=>E((()=>import("../js/songListDetail/index.8d6e4f9c.js")),["..\\js\\songListDetail\\index.8d6e4f9c.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\@vueuse\\@vueuse.ff3981c6.js","..\\js\\description\\description.d0b65970.js","..\\js\\Audio\\Audio.71320094.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-b717fec9.css","./description-4cf1ba01.css","..\\js\\index\\index.96a8266b.js","..\\js\\index\\index.ff010ab7.js","./index-c97f11a3.css","./index-72e1b881.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-32f89e51.css"],import.meta.url),meta:{title:"歌单详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/albumListDetail",name:"albumListDetail",component:()=>E((()=>import("../js/albumListDetail/index.1287806e.js")),["..\\js\\albumListDetail\\index.1287806e.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\description\\description.d0b65970.js","..\\js\\Audio\\Audio.71320094.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-b717fec9.css","./description-4cf1ba01.css","..\\js\\index\\index.96a8266b.js","..\\js\\index\\index.ff010ab7.js","./index-c97f11a3.css","./index-72e1b881.css","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-ed896de1.css"],import.meta.url),meta:{title:"专辑详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/mvListDetail",name:"mvListDetail",component:()=>E((()=>import("../js/mvListDetail/index.a22a5a58.js")),["..\\js\\mvListDetail\\index.a22a5a58.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.0b9292d3.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\vue-router\\vue-router.b68e67a8.js","./index-351d1418.css","..\\js\\index\\index.c9bd3452.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","./index-7d44717d.css","..\\js\\vue3-video-play\\vue3-video-play.531530fd.js","./vue3-video-play-44cc9245.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-8a1ce95e.css"],import.meta.url),meta:{title:"mv详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/artistListDetail",name:"artistListDetail",component:()=>E((()=>import("../js/artistListDetail/index.7dd1b067.js")),["..\\js\\artistListDetail\\index.7dd1b067.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.be2a8b58.js","..\\js\\Audio\\Audio.71320094.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-b717fec9.css","./index-b358057a.css","..\\js\\index\\index.0b9292d3.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","./index-351d1418.css","..\\js\\index\\index.96a8266b.js","..\\js\\index\\index.ff010ab7.js","./index-c97f11a3.css","./index-72e1b881.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-8d84816b.css"],import.meta.url),meta:{title:"歌手详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/userListDetail",name:"userListDetail",component:()=>E((()=>import("../js/userListDetail/index.b2d90a31.js")),["..\\js\\userListDetail\\index.b2d90a31.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.c9bd3452.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","./index-7d44717d.css","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-d8e65826.css"],import.meta.url),meta:{title:"用户详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/search",name:"search",component:()=>E((()=>import("../js/search/index.e87dc33b.js")),["..\\js\\search\\index.e87dc33b.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\search\\search.a3c2d224.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-7d395123.css"],import.meta.url),meta:{title:"搜索",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/searchDetail",name:"searchDetail",component:()=>E((()=>import("../js/searchDetail/index.984bfad5.js")),["..\\js\\searchDetail\\index.984bfad5.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.0b9292d3.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\vue-router\\vue-router.b68e67a8.js","./index-351d1418.css","..\\js\\index\\index.c9bd3452.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","./index-7d44717d.css","..\\js\\index\\index.f8ea82bb.js","..\\js\\index\\index.21bff93b.js","./index-00c1926a.css","./index-795f07d6.css","..\\js\\index\\index.96a8266b.js","..\\js\\Audio\\Audio.71320094.js","./Audio-b717fec9.css","..\\js\\index\\index.ff010ab7.js","./index-c97f11a3.css","./index-72e1b881.css","..\\js\\search\\search.a3c2d224.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-b0683593.css"],import.meta.url),meta:{title:"搜索详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/recommend",name:"recommend",component:()=>E((()=>import("../js/recommend/index.1926e412.js")),["..\\js\\recommend\\index.1926e412.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.f8ea82bb.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\index\\index.21bff93b.js","./index-00c1926a.css","..\\js\\vue-router\\vue-router.b68e67a8.js","./index-795f07d6.css","..\\js\\index\\index.be2a8b58.js","..\\js\\Audio\\Audio.71320094.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-b717fec9.css","./index-b358057a.css","..\\js\\index\\index.96a8266b.js","..\\js\\index\\index.ff010ab7.js","./index-c97f11a3.css","./index-72e1b881.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-458a619b.css"],import.meta.url),meta:{title:"每日推荐",keepAlive:!0,showHeader:!1,showFooter:!1}}]},{path:"/login",name:"login",component:()=>E((()=>import("../js/login/index.2849acdc.js")),["..\\js\\login\\index.2849acdc.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\fbs\\fbs.f505ac0f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-09c28a2e.css"],import.meta.url),children:[{path:"/login/phone",name:"phone",component:()=>E((()=>import("../js/phone/index.9a091180.js")),["..\\js\\phone\\index.9a091180.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-4bf68998.css"],import.meta.url)},{path:"/login/password",name:"password",component:()=>E((()=>import("../js/password/index.3438d1d5.js")),["..\\js\\password\\index.3438d1d5.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-12a0bb42.css"],import.meta.url)},{path:"QRCode",name:"QRCode",component:()=>E((()=>import("../js/QRCode/index.f9219614.js")),["..\\js\\QRCode\\index.f9219614.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\qrcode.vue\\qrcode.vue.cba915fd.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.7b9efb6e.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-de600ae3.css"],import.meta.url)}]},{path:"/:pathMatch(.*)*",name:"notFound",component:()=>E((()=>import("../js/notFound/index.1138e37a.js")),["..\\js\\notFound\\index.1138e37a.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js"],import.meta.url)}]});j.beforeEach(((e,t,o)=>{h.start(),e.name&&(document.title=e.name),o()})),j.afterEach((()=>{h.done()}));const w=""+new URL("loading-62337141.gif",import.meta.url).href,x={draggable:{mounted:function(e){e.style.cursor="move",e.style.position="absolute",e.onmousedown=function(t){let o=t.pageX-e.offsetLeft,n=t.pageY-e.offsetTop;e.onmousemove=function(t){let i=t.pageX-o,s=t.pageY-n,r=e.parentNode.offsetWidth-e.offsetWidth,a=e.parentNode.offsetHeight-e.offsetHeight;i<0?i=0:i>r&&(i=r),s<0?s=0:s>a&&(s=a),e.style.left=i+"px",e.style.top=s+"px"},e.onmouseup=function(){e.onmousemove=e.onmouseup=null}},e.addEventListener("touchstart",(function(t){let o=t.touches[0].pageX-e.offsetLeft,n=t.touches[0].pageY-e.offsetTop;e.addEventListener("touchmove",(function(t){let i=t.touches[0].pageX-o,s=t.touches[0].pageY-n,r=e.parentNode.offsetWidth-e.offsetWidth,a=e.parentNode.offsetHeight-e.offsetHeight;i<0?i=0:i>r&&(i=r),s<0?s=0:s>a&&(s=a),e.style.left=i+"px",e.style.top=s+"px"})),e.addEventListener("touchend",(function(){e.removeEventListener("touchmove",null),e.removeEventListener("touchend",null)}))}))}},preview:{mounted(e,t){const o=e,n=t.value;o.src=n,o.style.cursor="pointer",o.addEventListener("click",(()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.background="rgba(0,0,0,0.5)",e.style.zIndex="999",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center";const t=document.createElement("img");t.src=n,t.style.maxWidth="100%",t.style.maxHeight="100%",t.style.cursor="move",t.style.userSelect="none",t.style.position="absolute",e.appendChild(t),document.body.appendChild(e);let o=!1,i=0,s=0;t.onmousedown=function(e){e.preventDefault(),o=!0,i=e.clientX-t.offsetLeft,s=e.clientY-t.offsetTop,document.onmousemove=function(e){o&&(t.style.left=e.clientX-i+"px",t.style.top=e.clientY-s+"px")},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}},t.ontouchstart=function(e){e.preventDefault(),o=!0,i=e.touches[0].clientX-t.offsetLeft,s=e.touches[0].clientY-t.offsetTop,document.ontouchmove=function(e){o&&(t.style.left=e.touches[0].clientX-i+"px",t.style.top=e.touches[0].clientY-s+"px")},document.ontouchend=function(){document.ontouchmove=document.ontouchend=null}};let r=1;t.addEventListener("wheel",(e=>{e.preventDefault(),e.deltaY>0?r-=.1:r+=.1,t.style.transform=`scale(${r})`})),e.addEventListener("click",(()=>{document.body.removeChild(e)})),t.addEventListener("click",(e=>{e.stopPropagation()}))}))}}},L={install:function(e){Object.keys(x).forEach((t=>{e.directive(t,x[t])}))}},y=l(g),b=m();b.use(f),y.use(b),y.use(j),y.use(L),y.use(d,{lazyComponent:!1,loading:w,error:w}),y.mount("#app");export{_,E as a};
