import{I as s,t as e,s as a}from"../vant/vant.52bb3d0f.js";import{Q as o}from"../qrcode.vue/qrcode.vue.cba915fd.js";import{u as t}from"../vue-router/vue-router.b68e67a8.js";import{s as r}from"../pinia/pinia.86e899a9.js";import{u as n}from"../index/index.7b9efb6e.js";import{_ as i}from"../../assets/index-047f360a.js";import{r as l,o as c,P as u,Q as p,W as d,G as m,u as v,X as f,$ as g,U as j,V as k}from"../@vue/@vue.94aa2a2d.js";import"../@vant/@vant.4990c6ed.js";import"../axios/axios.c5318529.js";import"../form-data/form-data.01cb563f.js";import"../nprogress/nprogress.6d8e6ba3.js";import"../pinia-plugin-persistedstate/pinia-plugin-persistedstate.712c107f.js";const x=s=>(j("data-v-0c9de6a6"),s=s(),k(),s),y={class:"QRCode"},b=x((()=>d("span",null,"二维码登录",-1))),Q={class:"content"},C={key:0},I={key:1},_=x((()=>d("span",{style:{"font-size":"14px"}},"刷新二维码",-1))),h=i({__name:"index",setup(i){let j=l(200),k=null,x=l(!1);const h=t(),{isLogin:w}=r(n()),{QRCode:z,getQrKey:q,getQrCreate:D,getQrCheck:F}=n();async function H(){await q(),await D(),k=setInterval((async()=>{switch(await F(),z.status.code){case 800:console.log("二维码过期"),R();break;case 801:console.log("等待扫码");break;case 802:console.log("待确认");break;case 803:console.log("登录成功"),clearInterval(k),w.value=!0,a({type:"success",message:"登录成功"}),h.push({name:"home"});break;default:console.log("状态码错误",z.status.code)}}),1e3)}function R(){x.value=!0,null!==k&&clearInterval(k),setTimeout((()=>{x.value=!1,H(),a({message:"刷新成功",color:"#ffffff",background:"#F9343D",position:"top",duration:2e3})}),1e3)}return H(),c((()=>{console.log("离开扫码登录页"),clearInterval(k)})),(a,t)=>{const r=s,n=e;return u(),p("div",y,[d("div",{class:"top",onClick:t[0]||(t[0]=s=>a.$router.back())},[m(r,{name:"arrow-left",size:"23"}),b]),d("div",Q,[m(o,{value:v(z).url,size:v(j),level:"H"},null,8,["value","size"]),v(z).status.message?(u(),p("span",I,f(v(z).status.message),1)):(u(),p("span",C,"加载中...")),m(n,{loading:v(x),"loading-type":"spinner","loading-size":"16px",color:"#F9343D",onClick:R},{default:g((()=>[_])),_:1},8,["loading"])])])}}},[["__scopeId","data-v-0c9de6a6"]]);export{h as default};
