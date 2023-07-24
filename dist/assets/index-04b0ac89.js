import{r as e,p as t,a3 as o,P as n,a2 as s,$ as i,G as r,N as a}from"../js/@vue/@vue.94aa2a2d.js";import{c as l}from"../js/pinia/pinia.86e899a9.js";import{C as m,L as p}from"../js/vant/vant.52bb3d0f.js";import{c,a as u}from"../js/vue-router/vue-router.b68e67a8.js";import{N as d}from"../js/nprogress/nprogress.6d8e6ba3.js";import{s as h}from"../js/pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";import"../js/@vant/@vant.4990c6ed.js";import"../js/form-data/form-data.01cb563f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const f=(e,t)=>{const o=e.__vccOpts||e;for(const[n,s]of t)o[n]=s;return o},_=f({__name:"App",setup(a){const l=e("light");return t("theme",l),(e,t)=>{const a=o("RouterView"),p=m;return n(),s(p,{theme:l.value},{default:i((()=>[r(a)])),_:1},8,["theme"])}}},[["__scopeId","data-v-7c3d6fa3"]]),v={},E=function(e,t,o){if(!t||0===t.length)return e();const n=document.getElementsByTagName("link");return Promise.all(t.map((e=>{if(e=function(e,t){return new URL(e,t).href}(e,o),e in v)return;v[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(!!o)for(let o=n.length-1;o>=0;o--){const s=n[o];if(s.href===e&&(!t||"stylesheet"===s.rel))return}else if(document.querySelector(`link[href="${e}"]${s}`))return;const i=document.createElement("link");return i.rel=t?"stylesheet":"modulepreload",t||(i.as="script",i.crossOrigin=""),i.href=e,document.head.appendChild(i),t?new Promise(((t,o)=>{i.addEventListener("load",t),i.addEventListener("error",(()=>o(new Error(`Unable to preload CSS for ${e}`))))})):void 0}))).then((()=>e()))};d.configure({easing:"ease",speed:500,showSpinner:!1});const j=c({history:u("./"),routes:[{path:"/",name:"layout",component:()=>E((()=>import("../js/layout/index.2f01ab66.js")),["..\\js\\layout\\index.2f01ab66.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\Audio\\Audio.f72bc182.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-63abefef.css","..\\js\\index\\index.32361b32.js","./index-b73964f5.css","..\\js\\fbs\\fbs.f505ac0f.js","..\\js\\user\\user.5f6f134e.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-b4b15e52.css"],import.meta.url),redirect:"/discover",children:[{path:"/discover",name:"discover",component:()=>E((()=>import("../js/discover/index.4b13f650.js")),["..\\js\\discover\\index.4b13f650.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-c4a8c68e.css"],import.meta.url),meta:{title:"发现页",keepAlive:!0,showHeader:!0,showFooter:!0}},{path:"/follow",name:"follow",component:()=>E((()=>import("../js/follow/index.36c04a56.js")),["..\\js\\follow\\index.36c04a56.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-7e6b549a.css"],import.meta.url),meta:{title:"关注页",keepAlive:!0,showHeader:!0,showFooter:!0},children:[{path:"/follow/bilibili",name:"bilibili",component:()=>E((()=>import("../js/bilibili/index.1a7cc411.js")),["..\\js\\bilibili\\index.1a7cc411.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-5120c13f.css"],import.meta.url),meta:{title:"bilibili",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/follow/bangumi",name:"bangumi",component:()=>E((()=>import("../js/bangumi/index.edf748b8.js")),["..\\js\\bangumi\\index.edf748b8.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-9e72d861.css"],import.meta.url),meta:{title:"bangumi",keepAlive:!0,showHeader:!1,showFooter:!1}}]},{path:"/home",name:"home",component:()=>E((()=>import("../js/home/index.4ae31456.js")),["..\\js\\home\\index.4ae31456.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.f11def1b.js","./index-fc5e579c.css","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\fbs\\fbs.f505ac0f.js","..\\js\\user\\user.5f6f134e.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-f06b883c.css"],import.meta.url),meta:{title:"首页",keepAlive:!0,showHeader:!0,showFooter:!0}},{path:"/about",name:"about",component:()=>E((()=>import("../js/about/index.e51addc8.js")),["..\\js\\about\\index.e51addc8.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-5433fa04.css"],import.meta.url),meta:{title:"关于页",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/songListDetail",name:"songListDetail",component:()=>E((()=>import("../js/songListDetail/index.50cb7a23.js")),["..\\js\\songListDetail\\index.50cb7a23.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\@vueuse\\@vueuse.ff3981c6.js","..\\js\\description\\description.591c9ed3.js","..\\js\\Audio\\Audio.f72bc182.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-63abefef.css","./description-1d47cd0f.css","..\\js\\index\\index.519c71a8.js","..\\js\\index\\index.32361b32.js","./index-b73964f5.css","./index-ec19b666.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-21b81358.css"],import.meta.url),meta:{title:"歌单详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/albumListDetail",name:"albumListDetail",component:()=>E((()=>import("../js/albumListDetail/index.edc7f128.js")),["..\\js\\albumListDetail\\index.edc7f128.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\description\\description.591c9ed3.js","..\\js\\Audio\\Audio.f72bc182.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-63abefef.css","./description-1d47cd0f.css","..\\js\\index\\index.519c71a8.js","..\\js\\index\\index.32361b32.js","./index-b73964f5.css","./index-ec19b666.css","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-c08bfeee.css"],import.meta.url),meta:{title:"专辑详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/mvListDetail",name:"mvListDetail",component:()=>E((()=>import("../js/mvListDetail/index.cc5c0a17.js")),["..\\js\\mvListDetail\\index.cc5c0a17.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.ebf7d32e.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\vue-router\\vue-router.b68e67a8.js","./index-4bf433c0.css","..\\js\\index\\index.5377438e.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","./index-a98a60c3.css","..\\js\\vue3-video-play\\vue3-video-play.531530fd.js","./vue3-video-play-44cc9245.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-422f6e92.css"],import.meta.url),meta:{title:"mv详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/artistListDetail",name:"artistListDetail",component:()=>E((()=>import("../js/artistListDetail/index.4126e2df.js")),["..\\js\\artistListDetail\\index.4126e2df.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.18e83075.js","..\\js\\Audio\\Audio.f72bc182.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-63abefef.css","./index-13879de4.css","..\\js\\index\\index.ebf7d32e.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","./index-4bf433c0.css","..\\js\\index\\index.519c71a8.js","..\\js\\index\\index.32361b32.js","./index-b73964f5.css","./index-ec19b666.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-c67edcc6.css"],import.meta.url),meta:{title:"歌手详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/userListDetail",name:"userListDetail",component:()=>E((()=>import("../js/userListDetail/index.921cdcc8.js")),["..\\js\\userListDetail\\index.921cdcc8.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.5377438e.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","./index-a98a60c3.css","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-6c050bbb.css"],import.meta.url),meta:{title:"用户详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/search",name:"search",component:()=>E((()=>import("../js/search/index.e00ae117.js")),["..\\js\\search\\index.e00ae117.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\search\\search.501f940d.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-271fd133.css"],import.meta.url),meta:{title:"搜索",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/searchDetail",name:"searchDetail",component:()=>E((()=>import("../js/searchDetail/index.ba9b7ff3.js")),["..\\js\\searchDetail\\index.ba9b7ff3.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.ebf7d32e.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\vue-router\\vue-router.b68e67a8.js","./index-4bf433c0.css","..\\js\\index\\index.5377438e.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","./index-a98a60c3.css","..\\js\\index\\index.05b1de3c.js","..\\js\\index\\index.f11def1b.js","./index-fc5e579c.css","./index-e9f64edb.css","..\\js\\index\\index.519c71a8.js","..\\js\\Audio\\Audio.f72bc182.js","./Audio-63abefef.css","..\\js\\index\\index.32361b32.js","./index-b73964f5.css","./index-ec19b666.css","..\\js\\search\\search.501f940d.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-b2b08535.css"],import.meta.url),meta:{title:"搜索详情",keepAlive:!0,showHeader:!1,showFooter:!1}},{path:"/recommend",name:"recommend",component:()=>E((()=>import("../js/recommend/index.832b8535.js")),["..\\js\\recommend\\index.832b8535.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\index\\index.05b1de3c.js","..\\js\\useFilter\\useFilter.6545905c.js","..\\js\\china-division\\china-division.19bf229b.js","..\\js\\index\\index.f11def1b.js","./index-fc5e579c.css","..\\js\\vue-router\\vue-router.b68e67a8.js","./index-e9f64edb.css","..\\js\\index\\index.18e83075.js","..\\js\\Audio\\Audio.f72bc182.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","./Audio-63abefef.css","./index-13879de4.css","..\\js\\index\\index.519c71a8.js","..\\js\\index\\index.32361b32.js","./index-b73964f5.css","./index-ec19b666.css","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-dfa8c349.css"],import.meta.url),meta:{title:"每日推荐",keepAlive:!0,showHeader:!1,showFooter:!1}}]},{path:"/login",name:"login",component:()=>E((()=>import("../js/login/index.ce28a233.js")),["..\\js\\login\\index.ce28a233.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\fbs\\fbs.f505ac0f.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-fdacd3e2.css"],import.meta.url),children:[{path:"/login/phone",name:"phone",component:()=>E((()=>import("../js/phone/index.4a8ff810.js")),["..\\js\\phone\\index.4a8ff810.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-056e64ae.css"],import.meta.url)},{path:"/login/password",name:"password",component:()=>E((()=>import("../js/password/index.ac3d1dd9.js")),["..\\js\\password\\index.ac3d1dd9.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-92a981e7.css"],import.meta.url)},{path:"QRCode",name:"QRCode",component:()=>E((()=>import("../js/QRCode/index.1c692245.js")),["..\\js\\QRCode\\index.1c692245.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\qrcode.vue\\qrcode.vue.cba915fd.js","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\index\\index.1b674fdb.js","..\\js\\axios\\axios.c5318529.js","..\\js\\form-data\\form-data.01cb563f.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js","./index-0ce4f846.css"],import.meta.url)}]},{path:"/:pathMatch(.*)*",name:"notFound",component:()=>E((()=>import("../js/notFound/index.05fb5cdb.js")),["..\\js\\notFound\\index.05fb5cdb.js","..\\js\\@vue\\@vue.94aa2a2d.js","..\\js\\pinia\\pinia.86e899a9.js","..\\js\\vant\\vant.52bb3d0f.js","..\\js\\@vant\\@vant.4990c6ed.js","./vant-282eba37.css","..\\js\\vue-router\\vue-router.b68e67a8.js","..\\js\\nprogress\\nprogress.6d8e6ba3.js","..\\js\\form-data\\form-data.01cb563f.js","./nprogress-8b89e2e0.css","..\\js\\pinia-plugin-persistedstate\\pinia-plugin-persistedstate.712c107f.js"],import.meta.url)}]});j.beforeEach(((e,t,o)=>{d.start(),e.name&&(document.title=e.name),o()})),j.afterEach((()=>{d.done()}));const L=""+new URL("loading-62337141.gif",import.meta.url).href,g={draggable:{mounted:function(e){e.style.cursor="move",e.style.position="absolute",e.onmousedown=function(t){let o=t.pageX-e.offsetLeft,n=t.pageY-e.offsetTop;e.onmousemove=function(t){let s=t.pageX-o,i=t.pageY-n,r=e.parentNode.offsetWidth-e.offsetWidth,a=e.parentNode.offsetHeight-e.offsetHeight;s<0?s=0:s>r&&(s=r),i<0?i=0:i>a&&(i=a),e.style.left=s+"px",e.style.top=i+"px"},e.onmouseup=function(){e.onmousemove=e.onmouseup=null}},e.addEventListener("touchstart",(function(t){let o=t.touches[0].pageX-e.offsetLeft,n=t.touches[0].pageY-e.offsetTop;e.addEventListener("touchmove",(function(t){let s=t.touches[0].pageX-o,i=t.touches[0].pageY-n,r=e.parentNode.offsetWidth-e.offsetWidth,a=e.parentNode.offsetHeight-e.offsetHeight;s<0?s=0:s>r&&(s=r),i<0?i=0:i>a&&(i=a),e.style.left=s+"px",e.style.top=i+"px"})),e.addEventListener("touchend",(function(){e.removeEventListener("touchmove",null),e.removeEventListener("touchend",null)}))}))}},preview:{mounted(e,t){const o=e,n=t.value;o.src=n,o.style.cursor="pointer",o.addEventListener("click",(()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.background="rgba(0,0,0,0.5)",e.style.zIndex="999",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center";const t=document.createElement("img");t.src=n,t.style.maxWidth="100%",t.style.maxHeight="100%",t.style.cursor="move",t.style.userSelect="none",t.style.position="absolute",e.appendChild(t),document.body.appendChild(e);let o=!1,s=0,i=0;t.onmousedown=function(e){e.preventDefault(),o=!0,s=e.clientX-t.offsetLeft,i=e.clientY-t.offsetTop,document.onmousemove=function(e){o&&(t.style.left=e.clientX-s+"px",t.style.top=e.clientY-i+"px")},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}},t.ontouchstart=function(e){e.preventDefault(),o=!0,s=e.touches[0].clientX-t.offsetLeft,i=e.touches[0].clientY-t.offsetTop,document.ontouchmove=function(e){o&&(t.style.left=e.touches[0].clientX-s+"px",t.style.top=e.touches[0].clientY-i+"px")},document.ontouchend=function(){document.ontouchmove=document.ontouchend=null}};let r=1;t.addEventListener("wheel",(e=>{e.preventDefault(),e.deltaY>0?r-=.1:r+=.1,t.style.transform=`scale(${r})`})),e.addEventListener("click",(()=>{document.body.removeChild(e)})),t.addEventListener("click",(e=>{e.stopPropagation()}))}))}}},y={install:function(e){Object.keys(g).forEach((t=>{e.directive(t,g[t])}))}},w=a(_),D=l();D.use(h),w.use(D),w.use(j),w.use(y),w.use(p,{lazyComponent:!1,loading:L,error:L}),w.mount("#app");export{f as _,E as a};