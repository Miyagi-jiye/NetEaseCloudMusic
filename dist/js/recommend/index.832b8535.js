import{I as s}from"../vant/vant.52bb3d0f.js";import{a as e,r as o,ab as n,P as a,Q as i,W as t,G as m,R as r,I as d,J as c,u as l,L as p,a0 as g,a2 as u}from"../@vue/@vue.94aa2a2d.js";import{P as v}from"../index/index.05b1de3c.js";import{P as j}from"../index/index.18e83075.js";import{S as x}from"../index/index.519c71a8.js";import{d as f}from"../pinia/pinia.86e899a9.js";import{w as S,x as y}from"../index/index.1b674fdb.js";import{_ as R}from"../../assets/index-04b0ac89.js";import"../@vant/@vant.4990c6ed.js";import"../useFilter/useFilter.6545905c.js";import"../china-division/china-division.19bf229b.js";import"../index/index.f11def1b.js";import"../vue-router/vue-router.b68e67a8.js";import"../Audio/Audio.f72bc182.js";import"../index/index.32361b32.js";import"../axios/axios.c5318529.js";import"../form-data/form-data.01cb563f.js";import"../nprogress/nprogress.6d8e6ba3.js";import"../pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";const D=f("Recommend",(()=>{const s=e({recommendDailySongs:[],recommendReasons:[],recommendSongList:[]});return{recommendData:s,getRecommendSongList:async()=>{const e=await S();s.recommendSongList=e.recommend,console.log("🧍‍♂️用户每日推荐歌单",e)},getRecommendSongs:async()=>{const e=await y();s.recommendDailySongs=e.data.dailySongs,s.recommendReasons=e.data.recommendReasons,console.log("🧍‍♂️用户每日推荐歌曲",e)}}}),{persist:!0}),L={class:"recommend"},w={class:"header"},k={class:"center"},h={class:"switch"},b={class:"songs"},C={class:"songList"},F={name:"recommend"},I=R(Object.assign(F,{async setup(e){let f,S;const y=o(!0),{getRecommendSongs:R,getRecommendSongList:F,recommendData:I}=D();return[f,S]=n((()=>R())),await f,S(),[f,S]=n((()=>F())),await f,S(),(e,o)=>{const n=s;return a(),i("div",L,[t("div",w,[m(n,{name:"arrow-left",size:"23",onClick:o[0]||(o[0]=s=>e.$router.back())}),t("div",k,[t("div",h,[t("div",{class:r(["recommendDailySongs",1==y.value?"active":""]),onClick:o[1]||(o[1]=s=>y.value=!0)},"歌曲推荐",2),t("div",{class:r(["recommendSongList",0==y.value?"active":""]),onClick:o[2]||(o[2]=s=>y.value=!1)},"歌单推荐",2)])]),m(n,{name:"ellipsis",size:"23"})]),d(t("div",b,[m(j,{songs:l(I).recommendDailySongs,style:{top:"46px"}},null,8,["songs"]),(a(!0),i(p,null,g(l(I).recommendDailySongs,((s,e)=>(a(),u(x,{key:s.id,config:s,index:e},null,8,["config","index"])))),128))],512),[[c,1==y.value]]),d(t("div",C,[(a(!0),i(p,null,g(l(I).recommendSongList,((s,e)=>(a(),u(v,{key:s.id,config:s},null,8,["config"])))),128))],512),[[c,0==y.value]])])}}}),[["__scopeId","data-v-e4a51af5"]]);export{I as default};