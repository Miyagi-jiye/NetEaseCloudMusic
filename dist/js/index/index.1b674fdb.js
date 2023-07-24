import{a}from"../axios/axios.c5318529.js";import{d as t,s as e}from"../pinia/pinia.86e899a9.js";import{a as s,r as n,c as o}from"../@vue/@vue.94aa2a2d.js";import{s as r,h as i}from"../vant/vant.52bb3d0f.js";const c=t("login",(()=>{const a=s({key:"",url:"",status:{code:801,message:"",cookie:""}}),t=s({phone:"",captcha:""}),e=s({phone:"",password:""}),r=n(!1),i=n(!1),c=n("");return o((()=>"test")),{QRCode:a,captchaLogin:t,passwordLogin:e,isLogin:r,isChecked:i,cookie:c,getQrKey:async function(){const t=await async function(){const{data:a}=await d({url:"/login/qr/key",method:"get",params:{timestamp:Date.now()}});return a.data}();a.key=t.unikey,console.log("二维码key",t)},getQrCreate:async function(){const t=await async function(a,t=!0){const{data:e}=await d({url:`/login/qr/create?key=${a}&qrimg=${t}`,method:"get",params:{timestamp:Date.now()}});return e.data}(a.key);a.url=t.qrurl,console.log("二维码链接",t)},getQrCheck:async function(){const t=await async function(a){const{data:t}=await d({url:`/login/qr/check?key=${a}`,method:"get",params:{timestamp:Date.now()}});return t}(a.key);return a.status=t,c.value=t.cookie,console.log("检查二维码",t),t},getSendCaptcha:async function(){const a=await async function(a){const{data:t}=await d({url:"/captcha/sent",method:"post",data:{phone:a,timestamp:Date.now()}});return t}(t.phone);return console.log("发送验证码",a),a},getLoginByCaptcha:async function(){const a=await async function(a,t){const{data:e}=await d({url:"/login/cellphone",method:"get",params:{phone:a,captcha:t}});return e}(t.phone,t.captcha);return c.value=a.cookie,console.log("验证码登录",a),a},getLoginByPassword:async function(){const a=await async function(a,t){const{data:e}=await d({url:"/login/cellphone",method:"get",params:{phone:a,password:t}});return e}(e.phone,e.password);return c.value=a.cookie,console.log("密码登录",a),a}}}),{persist:{paths:["isLogin","cookie"]}});let u=prompt("请输入网易云API地址:","https://www.guowei.fun");u?console.log("你输入的API地址为:",u):u="https://www.guowei.fun";const d=a.create({baseURL:u,withCredentials:!0});async function m(a){const{data:t}=await d({url:`/user/detail?uid=${a}`,method:"get"});return t}async function l(){const{cookie:a}=e(c()),{data:t}=await d({url:"/user/account",method:"get",params:{timestamp:Date.now(),cookie:encodeURIComponent(JSON.stringify(a.value))}});return t}async function p(){const{data:a}=await d({url:"/user/subcount",method:"get"});return a}async function g(a,{limit:t=30,offset:e=1}){const{data:s}=await d({url:`/user/playlist?uid=${a}`,method:"get",params:{limit:t,offset:(e-1)*t}});return s}async function f(a,t){const{data:e}=await d({url:`/follow?id=${a}&t=${t}`,method:"get"});return e}async function h(a){const{data:t}=await d({url:"/artist/detail",method:"get",params:{id:a}});return t}async function y(a,{order:t="hot",limit:e=50,offset:s=1}){const{data:n}=await d({url:`/artist/songs?id=${a}`,method:"get",params:{order:t,limit:e,offset:(s-1)*e}});return n}async function w(a,{limit:t=30,offset:e=1}){const{data:s}=await d({url:"/artist/album",method:"get",params:{id:a,limit:t,offset:(e-1)*t}});return s}async function k(a,{limit:t=30,offset:e=1}){const{data:s}=await d({url:"/artist/mv",method:"get",params:{id:a,limit:t,offset:(e-1)*t}});return s}async function v(a,t=8){const{data:e}=await d({url:"/playlist/detail",method:"get",params:{id:a,s:t}});return e}async function b(a,{limit:t,offset:e}){const{data:s}=await d({url:`/playlist/track/all?id=${a}`,method:"get",params:{limit:t,offset:(e-1)*t}});return s}async function $(a,t="standard"){const{cookie:s}=e(c()),{data:n}=await d({url:`/song/url/v1?id=${a}&level=${t}`,method:"post",data:{cookie:encodeURIComponent(JSON.stringify(s.value))}});return n}async function C(a,{limit:t,offset:e,type:s}){const{data:n}=await d({url:`/cloudsearch?keywords=${a}`,method:"get",params:{limit:t,offset:(e-1)*t,type:s}});return n}async function x(a=0){const{data:t}=await d({url:"/banner",method:"get",params:{type:a}});return t}async function L(a,t){const{data:e}=await d({url:"/homepage/block/page",method:"get",params:{refresh:t,cursor:a}});return e.data}async function j(){const{data:a}=await d({url:"/homepage/dragon/ball",method:"get"});return a}async function q(a=30){const{data:t}=await d({url:"/personalized",method:"get",params:{limit:a}});return t}async function D(a=10){const{data:t}=await d({url:"/personalized/newsong",method:"get",params:{limit:a}});return t}async function B(){const{data:a}=await d({url:"/album/newest",method:"get"});return a}async function P(a){const{data:t}=await d({url:"/song/detail",method:"get",params:{ids:a}});return t}async function I(a){const{data:t}=await d({url:"/album",method:"get",params:{id:a}});return t}async function Q(){const{data:a}=await d({url:"/search/hot/detail",method:"get"});return a}async function R(a){const{data:t}=await d({url:"/mv/detail",method:"get",params:{mvid:a}});return t}async function T(a,t){const{data:e}=await d({url:"/mv/url",method:"get",params:{id:a,r:t}});return e}async function z(a){const{data:t}=await d({url:"/video/detail",method:"get",params:{id:a}});return t}async function A(a){const{data:t}=await d({url:"/simi/mv",method:"get",params:{mvid:a}});return t}async function S(a){const{data:t}=await d({url:"/lyric",method:"get",params:{id:a}});return t}async function U(){const{data:a}=await d({url:"/recommend/songs",method:"get"});return a}async function J(){const{data:a}=await d({url:"/recommend/resource",method:"get"});return a}d.interceptors.request.use((function(a){return a}),(function(a){return console.log("请求错误",a),Promise.reject(a)})),d.interceptors.response.use((function(a){return a.data.cookie&&console.log("拦截到响应头cookie===>",{cookie:a.data.cookie}),a}),(function(a){const{isLogin:t,cookie:s}=e(c());switch(a.response.status){case 400:-462===a.response.data.code?(console.log(a.response.data.data.blockText,a.response.data.data.url),i({title:"😭很抱歉，触发了网易云盾",message:a.response.data.data.blockText??"触发网易云盾，请先前往验证手机号",allowHtml:!0,confirmButtonText:"前往验证",cancelButtonText:"不管它"}).then((()=>{window.open(a.response.data.data.url)})).catch((()=>{}))):r({type:"danger",message:a.response.data.message??a.response.data.msg??"请求参数错误"});break;case 401:r({type:"danger",message:a.response.data.message??a.response.data.msg??"无访问权限"});break;case 403:r({type:"danger",message:a.response.data.message??a.response.data.msg??"拒绝访问"});break;case 404:r({type:"danger",message:a.response.data.message??a.response.data.msg??"请求地址出错"}),t.value=!1,s.value=null;break;case 501:r({type:"danger",message:a.response.data.message??a.response.data.msg??"账号错误"});break;case 503:r({type:"danger",message:a.response.data.message??a.response.data.msg??"验证码错误"})}return Promise.reject(a)}));export{x as A,q as B,D as C,B as D,S as a,P as b,l as c,m as d,p as e,g as f,b as g,I as h,T as i,A as j,f as k,h as l,R as m,y as n,w as o,v as p,k as q,Q as r,$ as s,C as t,c as u,z as v,J as w,U as x,j as y,L as z};
