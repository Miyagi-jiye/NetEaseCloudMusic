import{b as a,m as s,I as t,B as i}from"../vant/vant.52bb3d0f.js";import{I as l,u as e,P as r,Q as o,a8 as n,W as c,J as d,G as p,$ as u,M as m,a as g,r as f,L as v,a0 as y,a2 as _,Z as k,a4 as x,X as h,U as j,V as D,ab as b,w as I,S as L}from"../@vue/@vue.94aa2a2d.js";import{v as w}from"../@vueuse/@vueuse.ff3981c6.js";import{_ as P}from"../../assets/index-bc50e15e.js";import{S as C,F as U,I as A,D as z}from"../description/description.54c6cad0.js";import{S as M}from"../index/index.59afc84a.js";import{d as q}from"../pinia/pinia.86e899a9.js";import{p as S,g as $}from"../index/index.a7ba02c1.js";import{u as B,b as F}from"../vue-router/vue-router.b68e67a8.js";import"../@vant/@vant.4990c6ed.js";import"../nprogress/nprogress.6d8e6ba3.js";import"../form-data/form-data.01cb563f.js";import"../pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";import"../Audio/Audio.6682df1b.js";import"../index/index.d71aba5c.js";import"../axios/axios.c5318529.js";const Q={class:"loadMore"},T=P({__name:"index",props:{root:{required:!0,default:null},loading:{type:Boolean,required:!0,default:!1}},emits:["loadMore"],setup(s,{emit:t}){function i([{isIntersecting:a}]){console.log("👀可见性",a),a&&g()}function g(){t("loadMore")}return(t,f)=>{const v=a;return l((r(),o("div",Q,[n(t.$slots,"default",{},(()=>[l(c("span",{onClick:g},"加载更多",512),[[d,0==s.loading]]),l(p(v,{size:"24px"},{default:u((()=>[m("加载中...")])),_:1},512),[[d,1==s.loading]])]),!0)])),[[e(w),[i,{root:s.root}]]])}}},[["__scopeId","data-v-3033bd19"]]),E=q("songListDetail",(()=>{const a=g({playlist:{id:0,coverImgUrl:"",name:"",creator:{nickname:"",avatarUrl:""},description:"",tags:[],trackCount:0,playCount:0,shareCount:0,commentCount:0,subscribedCount:0,tracks:[]},trackAllParams:{offset:1,limit:20}});return{songListDetail:a,getPlaylistDetail:async function(s){const t=await S(s);a.playlist=t.playlist,console.log("歌单详情",t.playlist)},getPlaylistTrackAll:async function(){const s=await $(a.playlist.id,a.trackAllParams);return a.playlist.tracks=[...new Map([...a.playlist.tracks,...s.songs].map((a=>[a.id,a]))).values()],console.log("歌单所有歌曲",s),!0}}})),G={class:"songList"},H=P({__name:"content",setup(a){const s=f(!1),t=f(null),{songListDetail:i,getPlaylistTrackAll:l}=E();async function n(){s.value=!0,i.trackAllParams.offset++;await l()&&(s.value=!1)}return(a,l)=>(r(),o("div",{class:"songListDetail__content",ref_key:"root",ref:t},[p(C,{class:"subCard",height:"40px"}),p(U,{songs:e(i).playlist.tracks},null,8,["songs"]),c("div",G,[(r(!0),o(v,null,y(e(i).playlist.tracks,((a,s)=>(r(),_(M,{config:a,index:s},null,8,["config","index"])))),256))]),e(i).playlist.tracks.length<e(i).playlist.trackIds.length?(r(),_(T,{key:0,root:t.value,loading:s.value,onLoadMore:n},null,8,["root","loading"])):k("",!0)],512))}},[["__scopeId","data-v-9988ff75"]]),J={class:"songListDetail__detail"},V={class:"right nowrap"},W={class:"name nowrap"},X={key:0,class:"tags"},Z={class:"creator__avatarUrl",alt:"创建者"},K={class:"creator__nickname"},N=P({__name:"detail",setup(a){const i=B(),{songListDetail:n,getPlaylistDetail:d}=E();return(a,d)=>{const g=s,f=t,j=x("lazy");return r(),o("div",J,[p(A,{class:"left",imgUrl:e(n).playlist.coverImgUrl,width:"110px",height:"110px"},null,8,["imgUrl"]),c("div",V,[c("div",W,h(e(n).playlist.name),1),e(n).playlist.tags?(r(),o("div",X,[(r(!0),o(v,null,y(e(n).playlist.tags,(a=>(r(),_(g,{color:"#ffffff4a",round:""},{default:u((()=>[m(h(a),1)])),_:2},1024)))),256))])):k("",!0),c("div",{class:"creator",onClick:d[0]||(d[0]=a=>{return s="/userListDetail",t={id:e(n).playlist.creator.userId},void i.push({path:s,query:t});var s,t})},[l(c("img",Z,null,512),[[j,e(n).playlist.creator.avatarUrl+"?param=20y20"]]),c("div",K,h(e(n).playlist.creator.nickname),1),p(f,{name:"arrow",size:"12"})]),e(n).playlist.description?(r(),_(z,{key:1,class:"description",desc:e(n).playlist.description,end:24},null,8,["desc"])):k("",!0)])])}}},[["__scopeId","data-v-893d4b58"]]),O={},R={class:"songListDetail__header"},Y={class:"right"},aa=(a=>(j("data-v-37d5bcdd"),a=a(),D(),a))((()=>c("span",null,"歌单",-1))),sa={class:"right__right"};const ta=P(O,[["render",function(a,s){const i=t;return r(),o("div",R,[p(i,{class:"left",name:"arrow-left",size:"23",onClick:s[0]||(s[0]=s=>a.$router.back())}),c("div",Y,[aa,c("div",sa,[p(i,{name:"search",size:"23"}),p(i,{name:"ellipsis",size:"23"})])])])}],["__scopeId","data-v-37d5bcdd"]]),ia={class:"songListDetail"},la={class:"filter"},ea=P({__name:"index",async setup(a){let s,t;const l=F(),{songListDetail:n,getPlaylistDetail:d}=E();return[s,t]=b((()=>d(l.query.id))),await s,t(),I((()=>l.query.id),(a=>{"/songListDetail"===l.path?d(a):n.trackAllParams.offset=1})),(a,s)=>{const t=i;return r(),o("div",ia,[c("div",{class:"background",style:L({backgroundImage:"url("+e(n).playlist.coverImgUrl+"?param=10y10)"})},[c("div",la,[p(ta),p(N),p(H)])],4),p(t,{right:"32px",bottom:"76px",target:".songListDetail"})])}}},[["__scopeId","data-v-44f9d043"]]);export{ea as default};
