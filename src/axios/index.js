import axios from "axios";
import { showNotify, showConfirmDialog } from "vant"; // 引入vant的提示框
import { useLoginStore } from "@/stores/login.js";
import { storeToRefs } from "pinia";

// 通过 prompt 方法获取用户输入的地址
let userInput = prompt("请输入网易云API地址:","https://www.guowei.fun");
// 判断用户输入API是否为空
if (!userInput) {
  userInput = "https://www.guowei.fun";
} else {
  console.log("你输入的API地址为:", userInput);
}

const request = axios.create({
  // baseURL: import.meta.env.DEV ? '/api' : 'https://www.guowei.fun',
  // baseURL:'https://www.guowei.fun',
  baseURL: userInput,
  withCredentials: true, // 允许携带cookie
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("请求错误", error);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 拦截响应成功返回的cookie，存入本地
    if (response.data.cookie) {
      console.log("拦截到响应头cookie===>", { cookie: response.data.cookie });
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { isLogin, cookie } = storeToRefs(useLoginStore()); //登录状态
    // 1. 匹配常见错误，错误提示
    switch (error.response.status) {
      case 400:
        if (error.response.data.code === -462) {
          console.log(
            error.response.data.data.blockText,
            error.response.data.data.url
          );
          showConfirmDialog({
            title: "😭很抱歉，触发了网易云盾",
            message:
              error.response.data.data.blockText ??
              "触发网易云盾，请先前往验证手机号",
            allowHtml: true,
            confirmButtonText: "前往验证",
            cancelButtonText: "不管它",
          })
            .then(() => {
              // on confirm 确认按钮，新开页面，跳转到验证手机号页面 error.response.data.data.url
              window.open(error.response.data.data.url);
            })
            .catch(() => {
              // on cancel 取消按钮
            });
        } else {
          showNotify({
            type: "danger",
            message:
              error.response.data.message ??
              error.response.data.msg ??
              "请求参数错误",
          });
        }
        break;
      case 401:
        showNotify({
          type: "danger",
          message:
            error.response.data.message ??
            error.response.data.msg ??
            "无访问权限",
        });
        break;
      case 403:
        showNotify({
          type: "danger",
          message:
            error.response.data.message ??
            error.response.data.msg ??
            "拒绝访问",
        });
        break;
      case 404:
        showNotify({
          type: "danger",
          message:
            error.response.data.message ??
            error.response.data.msg ??
            "请求地址出错",
        });
        isLogin.value = false;
        cookie.value = null;
        break;
      case 501:
        showNotify({
          type: "danger",
          message:
            error.response.data.message ??
            error.response.data.msg ??
            "账号错误",
        });
        break;
      case 503:
        showNotify({
          type: "danger",
          message:
            error.response.data.message ??
            error.response.data.msg ??
            "验证码错误",
        });
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default request;
