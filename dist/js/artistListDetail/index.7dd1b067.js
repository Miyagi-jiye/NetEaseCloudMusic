import{I as s,T as a,p as t,l as i,B as e}from"../vant/vant.52bb3d0f.js";import{P as l}from"../index/index.be2a8b58.js";import{M as r}from"../index/index.0b9292d3.js";import{b as n}from"../useFilter/useFilter.6545905c.js";import{u as o,b as m}from"../vue-router/vue-router.b68e67a8.js";import{_ as d}from"../../assets/index-047f360a.js";import{C as u,a4 as c,P as p,Q as g,W as f,I as v,S as y,u as b,X as h,M as _,L as w,a0 as x,U as P,V as L,a as A,r as k,ab as j,w as S,f as I,G as D,$ as q,a2 as M}from"../@vue/@vue.94aa2a2d.js";import{S as V}from"../index/index.96a8266b.js";import{d as T}from"../pinia/pinia.86e899a9.js";import{l as C,n as U,o as z,q as E}from"../index/index.7b9efb6e.js";import"../@vant/@vant.4990c6ed.js";import"../Audio/Audio.71320094.js";import"../china-division/china-division.19bf229b.js";import"../nprogress/nprogress.6d8e6ba3.js";import"../form-data/form-data.01cb563f.js";import"../pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";import"../index/index.ff010ab7.js";import"../axios/axios.c5318529.js";const H=s=>(P("data-v-f29d47e2"),s=s(),L(),s),F={class:"AlbumListItem__left"},N={alt:""},Q=H((()=>f("div",{class:"disc"},null,-1))),R=H((()=>f("div",{class:"mask"},null,-1))),$={class:"AlbumListItem__right"},B=["innerHTML"],G={key:1,class:"AlbumListItem__right__title"},O={class:"AlbumListItem__right__artists"},W=["innerHTML"],X={key:1},J={class:"AlbumListItem__right__desc"},K=d({__name:"index",props:{config:{id:Number,name:String,artists:Array,publishTime:Number,picUrl:String},keyword:String},setup(s){const a=s,t=o(),i=new RegExp(a.keyword,"g"),e=u(a.keyword);function l(s){return s.replace(i,'<span class="highlight">'+e+"</span>")}return(a,i)=>{const r=c("lazy");return p(),g("div",{class:"AlbumListItem",onClick:i[0]||(i[0]=a=>{return i="/albumListDetail",e={id:s.config.id},void t.push({path:i,query:e});var i,e})},[f("div",F,[v(f("img",N,null,512),[[r,s.config.picUrl+"?param=100y100"]]),Q,R,f("div",{class:"shadow",style:y("background-image: url("+s.config.picUrl+"?param=10y10)")},null,4)]),f("div",$,[b(e)?(p(),g("div",{key:0,class:"AlbumListItem__right__title",innerHTML:l(s.config.name)},null,8,B)):(p(),g("div",G,h(s.config.name),1)),f("div",O,[_(" 作者： "),(p(!0),g(w,null,x(s.config.artists,(s=>(p(),g("span",null,[b(e)?(p(),g("span",{key:0,innerHTML:l(s.name)},null,8,W)):(p(),g("span",X,h(s.name),1))])))),256))]),f("div",J,[f("span",null,"发布日期："+h(b(n)(s.config.publishTime)),1)])])])}}},[["__scopeId","data-v-f29d47e2"]]),Y=T("artistListDetail",(()=>{const s=A({artist:{},blacklist:!1,identify:{},preferShow:0,secondaryExpertIdentiy:[],showPriMsg:!1,videoCount:0,songsParams:{order:"hot",limit:30,offset:1},albumsParams:{limit:10,offset:1},mvsParams:{limit:10,offset:1},songs:[],albums:[],mvs:[]});return{artistListDetail:s,getArtistDetail:async function(a){const t=await C(a);s.artist=t.data.artist,s.blacklist=t.data.blacklist,s.identify=t.data.identify,s.preferShow=t.data.preferShow,s.secondaryExpertIdentiy=t.data.secondaryExpertIdentiy,s.showPriMsg=t.data.showPriMsg,s.videoCount=t.data.videoCount,console.log("歌手详情",t.data)},getArtistSongs:async function(a){const t=await U(a,s.songsParams);s.songs=t.songs,console.log("歌手全部歌曲",t)},getArtistAlbum:async function(a){const t=await z(a,s.albumsParams);s.albums=t.hotAlbums,console.log("歌手全部专辑",t)},getArtistMv:async function(a){const t=await E(a,s.mvsParams);s.mvs=t.mvs,console.log("歌手全部mv",t)}}})),Z={class:"artistListDetail"},ss={class:"header"},as={class:"header__right"},ts={class:"background"},is={alt:""},es={class:"home"},ls={class:"song"},rs={class:"album"},ns={class:"mv"},os={name:"artistListDetail"},ms=d(Object.assign(os,{async setup(n){let o,d;const u=k(0),{artistListDetail:y,getArtistDetail:_,getArtistSongs:P,getArtistAlbum:L,getArtistMv:A}=Y(),T=m(),C=async()=>{await _(T.query.id),await P(T.query.id),await L(T.query.id),await A(T.query.id)};[o,d]=j((()=>C())),await o,d(),S((()=>T.query.id),(s=>{"/artistListDetail"===T.path&&C()}));const U=async s=>{y.songsParams.offset=s,await P(T.query.id)},z=async s=>{y.albumsParams.offset=s,await A(T.query.id)},E=async s=>{y.mvsParams.offset=s,await L(T.query.id)};return I((()=>{const s=document.querySelector(".artistListDetail");s.addEventListener("scroll",(()=>{const a=s.scrollTop,t=document.querySelector(".header");t.style.backdropFilter=a>0?"saturate(150%) contrast(100%) brightness(90%) blur(18px)":"none"}))})),(n,o)=>{const m=s,d=a,_=t,P=i,L=e,A=c("lazy");return p(),g("div",Z,[f("div",ss,[D(m,{class:"header__left",name:"arrow-left",size:"23",onClick:o[0]||(o[0]=s=>n.$router.back())}),f("div",as,[f("span",null,h(b(y).artist.name),1),D(m,{name:"ellipsis",size:"23"})])]),f("div",ts,[v(f("img",is,null,512),[[A,b(y).artist.cover+"?param=600y400)"]])]),D(P,{active:u.value,"onUpdate:active":o[4]||(o[4]=s=>u.value=s),swipeable:"",class:"vantTabs"},{default:q((()=>[D(d,{title:"主页"},{default:q((()=>[f("div",es,h(b(y).artist.briefDesc),1)])),_:1}),D(d,{title:"歌曲"},{default:q((()=>[f("div",ls,[D(l,{songs:b(y).songs},null,8,["songs"]),(p(!0),g(w,null,x(b(y).songs,((s,a)=>(p(),M(V,{key:s.id,config:s,index:a},null,8,["config","index"])))),128))]),D(_,{modelValue:b(y).songsParams.offset,"onUpdate:modelValue":o[1]||(o[1]=s=>b(y).songsParams.offset=s),mode:"simple","total-items":b(y).artist.musicSize,"items-per-page":b(y).songsParams.limit,onChange:U},null,8,["modelValue","total-items","items-per-page"])])),_:1}),D(d,{title:"专辑"},{default:q((()=>[f("div",rs,[(p(!0),g(w,null,x(b(y).albums,((s,a)=>(p(),M(K,{key:s.id,config:s},null,8,["config"])))),128))]),D(_,{modelValue:b(y).albumsParams.offset,"onUpdate:modelValue":o[2]||(o[2]=s=>b(y).albumsParams.offset=s),mode:"simple","total-items":b(y).artist.albumSize,"items-per-page":b(y).albumsParams.limit,onChange:E},null,8,["modelValue","total-items","items-per-page"])])),_:1}),D(d,{title:"MV"},{default:q((()=>[f("div",ns,[(p(!0),g(w,null,x(b(y).mvs,((s,a)=>(p(),M(r,{key:s.id,config:s},null,8,["config"])))),128))]),D(_,{modelValue:b(y).mvsParams.offset,"onUpdate:modelValue":o[3]||(o[3]=s=>b(y).mvsParams.offset=s),mode:"simple","total-items":b(y).artist.mvSize,"items-per-page":b(y).mvsParams.limit,onChange:z},null,8,["modelValue","total-items","items-per-page"])])),_:1})])),_:1},8,["active"]),D(L,{right:"32px",bottom:"76px",target:".artistListDetail"})])}}}),[["__scopeId","data-v-8500b6d4"]]);export{ms as default};