import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/reset.css'// 重置全局样式
import './assets/styles/root.css'// 根样式
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'//pinia数据持久化插件
import { Lazyload } from 'vant';// vant 懒加载指令(其采用的是 https://github.com/hilongjw/vue-lazyload)

// Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。
// 在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式。
// Toast
// import { showToast } from 'vant';//居中轻提示
import 'vant/es/toast/style';
// Dialog
// import { showDialog } from 'vant';//遮罩居中显示通知
import 'vant/es/dialog/style';
// Notify
// import { showNotify } from 'vant';//顶部显示通知
import 'vant/es/notify/style';
// ImagePreview
// import { showImagePreview } from 'vant';//显示图片
import 'vant/es/image-preview/style';

import loadingImg from '@/assets/images/loading.gif'// 加载图片
import directives from "@/directives/index";// 自定义指令

// console.log("环境变量", import.meta.env)

const app = createApp(App)
const pinia = createPinia();//创建pinia实例

pinia.use(piniaPluginPersistedstate)//给pinia实例挂载持久化插件
app.use(pinia)
app.use(router)
app.use(directives)// 注册所有自定义指令
app.use(Lazyload, {
  lazyComponent: false,
  loading: loadingImg,//加载图片
  error: loadingImg,//错误图片
});
app.mount('#app')
