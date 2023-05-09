<template>
  <van-config-provider :theme="theme">
    <RouterView />
  </van-config-provider>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import { showConfirmDialog } from 'vant';

// 自定义api
let api = ref()

//主题切换
const theme = ref('light')
provide('theme', theme)

onMounted(() => {
  // // // 判断网络协议，如果是https则使用http
  // if (window.location.protocol === 'https:') {
  //   showConfirmDialog({
  //     title: '注意！！',
  //     message: `
  //     该demo使用<span style="color:red">http</span>协议进行网络连接
  //     检测到您当前网络协议为<span style="color:red">https</span>
  //     是否立即切换？

  //     😀如果切换失败请自行百度浏览器设置
  //     `,
  //     allowHtml: true,
  //   })
  //     .then(() => {
  //       // on confirm 确认切换网络协议
  //       window.location.href = window.location.href.replace('https', 'http')//强制使用http协议
  //     })
  //     .catch(() => {
  //       // on cancel 取消切换网络协议
  //       console.log(
  //         `当前网络协议为：==>%c${window.location.protocol}`,
  //         'color: #fff;background: #000;padding: 2px 8px;border-radius: 5px;',
  //         '<==请切换到http协议'
  //       )
  //     });
  // } else {
  //   console.log(
  //     `%c当前网络协议为%c|%c${window.location.protocol}%c|%c${new Date().toLocaleString()}`,
  //     'color: #08d9d6;background: #000;padding: 4px 0 4px 8px;border-radius:4px 0 0 4px;font-weight:bold;',
  //     'color: #eaeaea;background: #000;padding: 4px 4px; font-weight: bold;',
  //     'color: #ff2e63;background: #000;padding: 4px 0;font-weight: bold;',
  //     'color: #eaeaea;background: #000;padding: 4px 4px; font-weight: bold;',
  //     'color: #f9ed69;background: #000;padding: 4px 8px 4px 0;border-radius:0 4px 4px 0; font-weight: bold;',
  //   )
  // }

  // 发送请求前判断是否有自定义api并且不为null或undefined
  if (localStorage.getItem('api') && localStorage.getItem('api') !== 'null' && localStorage.getItem('api') !== 'undefined') {
    console.log(
      `%c当前使用的api为%c|%c${localStorage.getItem('api')}`,
      'color: #000000;background: #eaeaea;padding: 4px 0 4px 8px;border-radius:4px 0 0 4px;font-weight:bold;border: 1px solid #ff0000;border-width: 1px 0 1px 1px;',
      'color: #f00000;background: #eaeaea;padding: 4px 4px; font-weight: bold;border: 1px solid #ff0000;border-width: 1px 0 1px 0;',
      'color: #000000;background: #eaeaea;padding: 4px 8px 4px 0;border-radius:0 4px 4px 0; font-weight: bold;border: 1px solid #ff0000;border-width: 1px 1px 1px 0;',
    )
    return
  } else {
    // 请输入您的网易云接口地址
    api.value = prompt('请输入您的网易云接口地址，没有可使用我提供的默认接口', 'https://www.guowei.fun')
    // 存入localStorage
    localStorage.setItem('api', api.value)
  }
})
</script>

<style scoped>
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>