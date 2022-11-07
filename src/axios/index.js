import axios from 'axios';
import { showNotify } from 'vant';// 引入vant的提示框

const request = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : 'http://guowei.fun:3000',
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // 1. 匹配常见错误，错误提示
    switch (error.response.status) {
      case 400:
        showNotify({ type: 'danger', message: error.response.data.message ?? error.response.data.msg ?? "请求参数错误" });
        break;
      case 401:
        showNotify({ type: 'danger', message: error.response.data.message ?? error.response.data.msg ?? "登录过期，请重新登录" });
        // 清除token
        // localStorage.removeItem("token");
        // 跳转到登录页面
        // router.push("/login");
        break;
      case 403:
        showNotify({ type: 'danger', message: error.response.data.message ?? error.response.data.msg ?? "拒绝访问" });
        break;
      case 404:
        showNotify({ type: 'danger', message: error.response.data.message ?? error.response.data.msg ?? "请求地址出错" });
        break;
      case 503:
        showNotify({ type: 'danger', message: error.response.data.message ?? error.response.data.msg ?? "验证码错误" });
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default request;