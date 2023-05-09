import{I as s,T as e,m as a,l as i,n as t}from"../vant/vant.52bb3d0f.js";import{I as l}from"../index/index.21bff93b.js";import{s as n}from"../pinia/pinia.86e899a9.js";import{u as o}from"../index/index.7b9efb6e.js";import{u as r}from"../vue-router/vue-router.b68e67a8.js";import{_ as c}from"../../assets/index-047f360a.js";import{r as d,u as _,P as p,Q as u,G as m,$ as f,W as v,X as y,L as g,a0 as C,S as k,M as h,Z as w,U as I,V as L,a4 as z,I as j,aa as b,w as U}from"../@vue/@vue.94aa2a2d.js";import{l as M}from"../fbs/fbs.f505ac0f.js";import{u as x}from"../user/user.834cb37b.js";import"../@vant/@vant.4990c6ed.js";import"../axios/axios.c5318529.js";import"../form-data/form-data.01cb563f.js";import"../nprogress/nprogress.6d8e6ba3.js";import"../pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";import"../useFilter/useFilter.6545905c.js";import"../china-division/china-division.19bf229b.js";const S=s=>(I("data-v-99b1dec5"),s=s(),L(),s),D={key:0,class:"mySonglistCard"},E={class:"mySonglistCard__one"},P={class:"header"},O={class:"header__title"},q={class:"header__setting"},F={class:"content"},G=["onClick"],$={class:"content__item__info"},A={class:"nowrap"},H={class:"nowrap"},Q={class:"content__item__setting"},T={class:"mySonglistCard__two"},V={class:"header"},W={class:"header__title"},X={class:"header__setting"},Z={class:"content"},B=["onClick"],J={class:"content__item__info"},K={class:"nowrap"},N={class:"nowrap"},R={class:"content__item__setting"},Y={class:"mySonglistCard__three"},ss=S((()=>v("div",{class:"header"},[v("span",{class:"header__title"},"歌单助手")],-1))),es={class:"helper"},as=S((()=>v("div",{class:"helper__title"},"你可以从歌单中筛选出",-1))),is={class:"helper__swiper"},ts={key:0},ls={key:1},ns={key:2},os={key:3},rs={key:4},cs=S((()=>v("div",{class:"footer"},[v("div",{class:"footer__button"},"试试看")],-1))),ds={key:1,class:"mySonglistCard"},_s={class:"mySonglistCard__one"},ps={class:"header"},us=S((()=>v("span",{class:"header__title"},"创建歌单",-1))),ms={class:"header__setting"},fs={class:"content"},vs={class:"content__noLogin"},ys={class:"img"},gs=S((()=>v("span",null,"一键导入外部音乐",-1))),Cs={class:"mySonglistCard__two"},ks={class:"header"},hs=S((()=>v("span",{class:"header__title"},"收藏歌单",-1))),ws={class:"header__setting"},Is=S((()=>v("div",{class:"content"},[v("div",{class:"content__noLogin"},[v("span",null,"暂无收藏的歌单")])],-1))),Ls={class:"mySonglistCard__three"},zs=S((()=>v("div",{class:"header"},[v("span",{class:"header__title"},"歌单助手")],-1))),js={class:"helper"},bs=S((()=>v("div",{class:"helper__title"},"你可以从歌单中筛选出",-1))),Us={class:"helper__swiper"},Ms={key:0},xs={key:1},Ss={key:2},Ds={key:3},Es={key:4},Ps=S((()=>v("div",{class:"footer"},[v("div",{class:"footer__button"},"试试看")],-1))),Os=c({__name:"index",props:{config:Object},setup(t){const c=["primary","success","danger","warning"],{isLogin:I}=n(o()),L=d(0),z=r();function j(s,e){z.push({path:s,query:e})}return(n,o)=>{const r=s,d=e,z=a,b=i;return t.config&&_(I)?(p(),u("div",D,[m(b,{active:L.value,"onUpdate:active":o[0]||(o[0]=s=>L.value=s),scrollspy:"",sticky:""},{default:f((()=>[m(d,{title:"创建歌单"},{default:f((()=>[v("div",E,[v("div",P,[v("span",O,"创建歌单("+y(t.config.createPlaylist.length)+")个",1),v("div",q,[m(r,{name:"plus"}),m(r,{name:"ellipsis"})])]),v("div",F,[(p(!0),u(g,null,C(t.config.createPlaylist,(s=>(p(),u("div",{class:"content__item",onClick:e=>j("/songListDetail",{id:s.id})},[m(l,{class:"content__item__img",imgUrl:s.coverImgUrl},null,8,["imgUrl"]),v("div",$,[v("span",A,y(s.name),1),v("span",H,y(s.trackCount)+"首",1)]),v("div",Q,[m(r,{name:"ellipsis"})])],8,G)))),256))])])])),_:1}),m(d,{title:"收藏歌单"},{default:f((()=>[v("div",T,[v("div",V,[v("span",W,"收藏歌单("+y(t.config.collectPlaylist.length)+")个",1),v("div",X,[m(r,{name:"ellipsis"})])]),v("div",Z,[(p(!0),u(g,null,C(t.config.collectPlaylist,(s=>(p(),u("div",{class:"content__item",onClick:e=>j("/songListDetail",{id:s.id})},[m(l,{class:"content__item__img",imgUrl:s.coverImgUrl},null,8,["imgUrl"]),v("div",J,[v("span",K,y(s.name),1),v("span",N,y(s.trackCount)+"首",1)]),v("div",R,[m(r,{name:"ellipsis"})])],8,B)))),256))])])])),_:1}),m(d,{title:"歌单助手"},{default:f((()=>[v("div",Y,[ss,v("div",es,[as,v("div",is,[(p(),u(g,null,C(5,(s=>v("div",{class:"helper__swiper__item",style:k({"--delay":s-2})},[1==s?(p(),u("div",ts,[m(z,{type:c[s-1]},{default:f((()=>[h("最近收藏")])),_:2},1032,["type"]),h(" 的 "),m(z,{type:c[s-2]},{default:f((()=>[h("二次元")])),_:2},1032,["type"])])):w("",!0),2==s?(p(),u("div",ls,[m(z,{type:c[s-1]},{default:f((()=>[h("80年代")])),_:2},1032,["type"]),m(z,{type:c[s-2]},{default:f((()=>[h("华语")])),_:2},1032,["type"]),h(" 老歌 ")])):w("",!0),3==s?(p(),u("div",ns,[m(z,{type:c[s-1]},{default:f((()=>[h("最近一年收藏")])),_:2},1032,["type"]),h(" 的 "),m(z,{type:c[s-2]},{default:f((()=>[h("日语")])),_:2},1032,["type"])])):w("",!0),4==s?(p(),u("div",os,[h(" 适合 "),m(z,{type:c[s-1]},{default:f((()=>[h("夜晚")])),_:2},1032,["type"]),h(" 听的 "),m(z,{type:c[s-2]},{default:f((()=>[h("日语")])),_:2},1032,["type"])])):w("",!0),5==s?(p(),u("div",rs,[m(z,{type:c[s-1]},{default:f((()=>[h("最近一年")])),_:2},1032,["type"]),h(" 发布的 "),m(z,{type:c[s-2]},{default:f((()=>[h("二次元")])),_:2},1032,["type"])])):w("",!0)],4))),64))])]),cs])])),_:1})])),_:1},8,["active"])])):(p(),u("div",ds,[m(b,{active:L.value,"onUpdate:active":o[1]||(o[1]=s=>L.value=s),scrollspy:"",sticky:""},{default:f((()=>[m(d,{title:"创建歌单"},{default:f((()=>[v("div",_s,[v("div",ps,[us,v("div",ms,[m(r,{name:"plus"}),m(r,{name:"ellipsis"})])]),v("div",fs,[v("div",vs,[v("div",ys,[m(r,{name:"plus",size:"2rem",color:"var(--font-color-5)"})]),gs])])])])),_:1}),m(d,{title:"收藏歌单"},{default:f((()=>[v("div",Cs,[v("div",ks,[hs,v("div",ws,[m(r,{name:"ellipsis"})])]),Is])])),_:1}),m(d,{title:"歌单助手"},{default:f((()=>[v("div",Ls,[zs,v("div",js,[bs,v("div",Us,[(p(),u(g,null,C(5,(s=>v("div",{class:"helper__swiper__item",style:k({"--delay":s-2})},[1==s?(p(),u("div",Ms,[m(z,{type:c[s-1],size:"medium"},{default:f((()=>[h("最近收藏")])),_:2},1032,["type"]),h(" 的 "),m(z,{type:c[s-2],size:"medium"},{default:f((()=>[h("二次元")])),_:2},1032,["type"])])):w("",!0),2==s?(p(),u("div",xs,[m(z,{type:c[s-1],size:"medium"},{default:f((()=>[h("80年代")])),_:2},1032,["type"]),m(z,{type:c[s-2],size:"medium"},{default:f((()=>[h("华语")])),_:2},1032,["type"]),h(" 老歌 ")])):w("",!0),3==s?(p(),u("div",Ss,[m(z,{type:c[s-1],size:"medium"},{default:f((()=>[h("最近一年收藏")])),_:2},1032,["type"]),h(" 的 "),m(z,{type:c[s-2],size:"medium"},{default:f((()=>[h("日语")])),_:2},1032,["type"])])):w("",!0),4==s?(p(),u("div",Ds,[h(" 适合 "),m(z,{type:c[s-1],size:"medium"},{default:f((()=>[h("夜晚")])),_:2},1032,["type"]),h(" 听的 "),m(z,{type:c[s-2],size:"medium"},{default:f((()=>[h("日语")])),_:2},1032,["type"])])):w("",!0),5==s?(p(),u("div",Es,[m(z,{type:c[s-1],size:"medium"},{default:f((()=>[h("最近一年")])),_:2},1032,["type"]),h(" 发布的 "),m(z,{type:c[s-2],size:"medium"},{default:f((()=>[h("二次元")])),_:2},1032,["type"])])):w("",!0)],4))),64))])]),Ps])])),_:1})])),_:1},8,["active"])]))}}},[["__scopeId","data-v-99b1dec5"]]),qs=s=>(I("data-v-2239d0da"),s=s(),L(),s),Fs={key:0,class:"myLikeMusicCard"},Gs={class:"myLikeMusicCard__left"},$s=qs((()=>v("span",{class:"myLikeMusicCard__center__title nowrap"},"我喜欢的音乐",-1))),As={class:"myLikeMusicCard__center__count nowrap"},Hs={class:"myLikeMusicCard__right"},Qs=qs((()=>v("span",null,"心动模式",-1))),Ts={key:1,class:"myLikeMusicCard"},Vs={class:"myLikeMusicCard__left"},Ws=qs((()=>v("div",{class:"myLikeMusicCard__center"},[v("div",{class:"myLikeMusicCard__center__title"},"我喜欢的音乐"),v("div",{class:"myLikeMusicCard__center__count"},"0首")],-1))),Xs={class:"myLikeMusicCard__right"},Zs=qs((()=>v("span",null,"心动模式",-1))),Bs=c({__name:"index",props:{config:Object},setup(e){const a=r(),{isLogin:i}=n(o());return(t,n)=>{const o=s;return e.config&&_(i)?(p(),u("div",Fs,[v("div",Gs,[m(l,{imgUrl:e.config.myLikeMusic[0].coverImgUrl},null,8,["imgUrl"])]),v("div",{class:"myLikeMusicCard__center",onClick:n[0]||(n[0]=s=>{return i="/songListDetail",t={id:e.config.myLikeMusic[0].id},void a.push({path:i,query:t});var i,t})},[$s,v("span",As,y(e.config.myLikeMusic[0].trackCount)+"首",1)]),v("div",Hs,[m(o,{name:"like-o",size:"0.8rem",color:"#E60026"}),Qs])])):(p(),u("div",Ts,[v("div",Vs,[m(l,{fg:!0})]),Ws,v("div",Xs,[m(o,{name:"like-o",size:"0.8rem",color:"#E60026"}),Zs])]))}}},[["__scopeId","data-v-2239d0da"]]),Js=s=>(I("data-v-243424f4"),s=s(),L(),s),Ks={key:0,class:"userInfoCard"},Ns={alt:"avatar"},Rs={class:"userInfoCard__info nowrap"},Ys={class:"userInfoCard__info__name"},se={style:{display:"flex","align-items":"center",color:"var(--font-color-4)","font-size":"14px"}},ee={class:"userInfoCard__info__follows"},ae=Js((()=>v("span",{class:"my-line"},null,-1))),ie={class:"userInfoCard__info__followeds"},te=Js((()=>v("span",{class:"my-line"},null,-1))),le={class:"userInfoCard__info__level"},ne={key:1,class:"userInfoCard"},oe={class:"userInfoCard__avatar"},re=["src"],ce={class:"userInfoCard__info nowrap"},de=b('<div style="display:flex;align-items:center;color:var(--font-color-4);font-size:14px;" data-v-243424f4><span class="userInfoCard__info__follows" data-v-243424f4>关注</span><span class="my-line" data-v-243424f4></span><span class="userInfoCard__info__followeds" data-v-243424f4>粉丝</span><span class="my-line" data-v-243424f4></span><span class="userInfoCard__info__level" data-v-243424f4>等级</span></div>',1),_e=c({__name:"index",props:{config:Object},setup(e){const a=r(),{isLogin:i}=n(o());return(t,l)=>{const n=s,o=z("lazy");return e.config&&_(i)?(p(),u("div",Ks,[v("div",{class:"userInfoCard__avatar",onClick:l[0]||(l[0]=s=>{return i="/userListDetail",t={id:e.config.profile.userId},void a.push({path:i,query:t});var i,t})},[j(v("img",Ns,null,512),[[o,e.config.profile.avatarUrl+"?param=200y200"]])]),v("div",Rs,[v("div",Ys,y(e.config.profile.nickname),1),v("div",se,[v("span",ee,y(e.config.profile.follows)+" 关注",1),ae,v("span",ie,y(e.config.profile.followeds)+" 粉丝",1),te,v("span",le,"Lv."+y(e.config.level),1)])])])):(p(),u("div",ne,[v("div",oe,[v("img",{src:_(M),alt:"avatar"},null,8,re)]),v("div",ce,[v("div",{class:"userInfoCard__info__name",onClick:l[1]||(l[1]=s=>t.$router.push("/login"))},[h(" 立即登录 "),m(n,{name:"arrow"})]),de])]))}}},[["__scopeId","data-v-243424f4"]]),pe={},ue=s=>(I("data-v-b1e8b1c0"),s=s(),L(),s),me={class:"functionCard"},fe={class:"functionCard__top"},ve={class:"functionCard__top__item"},ye=ue((()=>v("div",{class:"functionCard__top__item__title"},"本地/下载",-1))),ge={class:"functionCard__top__item"},Ce=ue((()=>v("div",{class:"functionCard__top__item__title"},"最近播放",-1))),ke={class:"functionCard__top__item"},he=ue((()=>v("div",{class:"functionCard__top__item__title"},"收藏和赞",-1))),we={class:"functionCard__top__item"},Ie=ue((()=>v("div",{class:"functionCard__top__item__title"},"已购",-1))),Le={class:"functionCard__bottom"},ze=ue((()=>v("span",null,"音乐应用",-1)));const je=c(pe,[["render",function(e,a){const i=s,l=t;return p(),u("div",me,[v("div",fe,[v("div",ve,[m(i,{name:"music",size:"2.5rem",color:"#E60026"}),ye]),v("div",ge,[m(i,{name:"play-circle",size:"2.5rem",color:"#E60026"}),Ce]),v("div",ke,[m(i,{name:"star",size:"2.5rem",color:"#E60026"}),he]),v("div",we,[m(i,{name:"goods-collect",size:"2.5rem",color:"#E60026"}),Ie])]),m(l),v("div",Le,[m(i,{name:"plus",size:"1rem"}),ze])])}],["__scopeId","data-v-b1e8b1c0"]]),be={class:"home nowrap"},Ue={name:"home"},Me=c(Object.assign(Ue,{setup(s){const{isLogin:e}=n(o()),{userData:a,getUserDetail:i,getUserSubcount:t,getUserAccount:l,getUserPlaylist:r}=x();async function c(){await l(),await i(),await t(),await r()}return e.value&&c(),U(e,(s=>{s&&c()})),(s,e)=>(p(),u("div",be,[m(_e,{config:_(a).detail},null,8,["config"]),m(je),m(Bs,{config:_(a).playlist},null,8,["config"]),m(Os,{config:_(a).playlist},null,8,["config"])]))}}),[["__scopeId","data-v-b8628106"]]);export{Me as default};
