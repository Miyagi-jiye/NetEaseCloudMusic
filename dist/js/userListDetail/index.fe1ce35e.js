import{I as e}from"../vant/vant.52bb3d0f.js";import{F as s}from"../index/index.378bd863.js";import{_ as a}from"../../assets/index-bc50e15e.js";import{P as i,Q as t,Z as l,U as r,V as o,W as c,a as n,ab as d,f as u,a4 as p,G as m,I as v,u as f,X as g,M as _}from"../@vue/@vue.94aa2a2d.js";import{e as y,g as h}from"../useFilter/useFilter.6545905c.js";import{d as D}from"../pinia/pinia.86e899a9.js";import{d as w}from"../index/index.a7ba02c1.js";import{b}from"../vue-router/vue-router.b68e67a8.js";import"../@vant/@vant.4990c6ed.js";import"../nprogress/nprogress.6d8e6ba3.js";import"../form-data/form-data.01cb563f.js";import"../pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";import"../china-division/china-division.19bf229b.js";import"../axios/axios.c5318529.js";const x=e=>(r("data-v-1c2bb953"),e=e(),o(),e),z={class:"GenderIcon"},j=["width","height"],k=[x((()=>c("path",{d:"M744.727273 651.636364c0-205.661091-166.702545-372.363636-372.363637-372.363637S0 445.975273 0 651.636364s166.702545 372.363636 372.363636 372.363636 372.363636-166.702545 372.363637-372.363636zM93.090909 651.636364c0-154.228364 125.044364-279.272727 279.272727-279.272728s279.272727 125.044364 279.272728 279.272728-125.044364 279.272727-279.272728 279.272727S93.090909 805.864727 93.090909 651.636364z",fill:"#75B9EB","p-id":"10238"},null,-1))),x((()=>c("path",{d:"M857.344 93.090909H698.181818a46.545455 46.545455 0 0 1 0-93.090909h279.272727a46.545455 46.545455 0 0 1 46.545455 46.545455v279.272727a46.545455 46.545455 0 0 1-93.090909 0V166.656L632.110545 465.454545 558.545455 391.889455 857.344 93.090909z",fill:"#75B9EB","p-id":"10239"},null,-1)))],L=["width","height"],S=[x((()=>c("path",{d:"M554.666667 680.021333V768h128a42.666667 42.666667 0 0 1 0 85.333333h-128v128a42.666667 42.666667 0 0 1-85.333334 0v-128h-128a42.666667 42.666667 0 0 1 0-85.333333h128v-87.978667C300.949333 659.029333 170.666667 515.413333 170.666667 341.333333 170.666667 152.810667 323.477333 0 512 0s341.333333 152.810667 341.333333 341.333333c0 174.08-130.282667 317.696-298.666666 338.688zM256 341.333333c0 141.376 114.624 256 256 256s256-114.624 256-256S653.376 85.333333 512 85.333333 256 199.957333 256 341.333333z",fill:"#e8579a","p-id":"11318"},null,-1)))],q=a({__name:"index",props:{config:{type:Number,required:!0},size:{type:Number,default:14}},setup:e=>(s,a)=>(i(),t("div",z,[1==e.config?(i(),t("svg",{key:0,t:"1668774461542",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"10237",width:e.size,height:e.size},k,8,j)):l("",!0),2==e.config?(i(),t("svg",{key:1,t:"1668774602435",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"11317",width:e.size,height:e.size},S,8,L)):l("",!0)]))},[["__scopeId","data-v-1c2bb953"]]),I=D("userListDetail",(()=>{const e=n({userDetail:{}});return{userListDetail:e,getUserListDetail:async s=>{const a=await w(s);e.userDetail=a,console.log("🧍‍♂️用户详情",a)}}})),U=e=>(r("data-v-c850e89e"),e=e(),o(),e),B={class:"userListDetail"},M={class:"header"},C={class:"title"},H={class:"title__avatar",alt:""},E={class:"background"},F={alt:""},V={class:"userinfoCard",style:{opacity:"1","margin-top":"-100px"}},G={class:"card"},N={class:"avatar",alt:""},P=["src"],$={class:"nickname"},Q={key:1,class:"identify"},T={class:"desc"},W={class:"desc__item"},X={class:"desc__item__value"},Z=U((()=>c("span",{class:"desc__item__title"},"关注",-1))),A=U((()=>c("div",{class:"desc__line"},null,-1))),J={class:"desc__item"},K={class:"desc__item__value"},O=U((()=>c("span",{class:"desc__item__title"},"粉丝",-1))),R=U((()=>c("div",{class:"desc__line"},null,-1))),Y={class:"desc__item"},ee=U((()=>c("span",{class:"desc__item__title"},"Lv.",-1))),se={class:"desc__item__value"},ae={class:"tags"},ie={class:"tag"},te={class:"tag"},le={class:"tag"},re={class:"tag"},oe={class:"btns"},ce={class:"chat"},ne={class:"moreCard"},de={class:"card"},ue={class:"signature"},pe=a({__name:"index",async setup(a){let r,o;const{getUserListDetail:n,userListDetail:D}=I(),w=b();return[r,o]=d((()=>(async()=>{await n(w.query.id)})())),await r,o(),u((()=>{const e=document.querySelector(".userListDetail");e.addEventListener("scroll",(()=>{const s=e.scrollTop,a=document.querySelector(".header"),i=document.querySelector(".title");document.querySelector(".background");const t=document.querySelector(".userinfoCard");s>0?(a.style.background=`rgb(255 255 255 / ${s}%)`,a.style.color="#000",t.style.opacity=1-s/t.offsetHeight,i.style.opacity=s/t.offsetHeight):(a.style.background="rgb(255 255 255 / 0%)",a.style.color="#fff",t.style.opacity=1,i.style.opacity=0)}))})),(a,r)=>{const o=e,n=p("lazy");return i(),t("div",B,[c("div",M,[m(o,{name:"arrow-left",size:"23",onClick:r[0]||(r[0]=e=>a.$router.back())}),c("div",C,[v(c("img",H,null,512),[[n,f(D).userDetail.profile.avatarUrl+"?param=40y40"]]),c("span",null,g(f(D).userDetail.profile.nickname),1)]),m(o,{name:"ellipsis",size:"23"})]),c("div",E,[v(c("img",F,null,512),[[n,f(D).userDetail.profile.backgroundUrl+"?param=600y400)"]])]),c("div",V,[c("div",G,[v(c("img",N,null,512),[[n,f(D).userDetail.profile.avatarUrl+"?param=200y200"]]),f(D).userDetail.identify?(i(),t("img",{key:0,class:"avatar__identify",src:f(D).userDetail.identify.imageUrl+"?param=20y20",alt:""},null,8,P)):l("",!0),c("div",$,g(f(D).userDetail.profile.nickname),1),f(D).userDetail.identify?(i(),t("div",Q,[c("span",null,g(f(D).userDetail.identify.imageDesc),1)])):l("",!0),c("div",T,[c("div",W,[c("span",X,g(f(D).userDetail.profile.follows),1),Z]),A,c("div",J,[c("span",K,g(f(D).userDetail.profile.followeds),1),O]),R,c("div",Y,[ee,c("span",se,g(f(D).userDetail.level),1)])]),c("div",ae,[c("div",ie,"👣IP属地："+g(f(y)(f(D).userDetail.profile.city)),1),c("div",te,"🌞村龄："+g(f(D).userDetail.createDays)+"天",1),c("div",le,[m(q,{config:f(D).userDetail.profile.gender,size:12},null,8,["config"]),_(" "+g(f(h)(f(D).userDetail.profile.birthday)),1)]),c("div",re,[m(o,{name:"arrow"})])]),c("div",oe,[m(s,{followed:f(D).userDetail.profile.followed,id:f(D).userDetail.profile.userId},null,8,["followed","id"]),c("div",ce,[m(o,{name:"chat-o",size:"16"}),_("私信 ")])])])]),c("div",ne,[c("div",de,[c("div",ue,g(f(D).userDetail.profile.signature),1)])])])}}},[["__scopeId","data-v-c850e89e"]]);export{pe as default};