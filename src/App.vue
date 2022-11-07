<template>
  <van-config-provider :theme="theme">
    <RouterView />
  </van-config-provider>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import { showConfirmDialog } from 'vant';

const theme = ref('light')
provide('theme', theme)

onMounted(() => {
  // 判断网络协议，如果是https则使用http
  if (window.location.protocol === 'https:') {
    showConfirmDialog({
      title: '注意！！',
      message: `
      该demo使用<span style="color:red">http</span>协议进行网络连接
      检测到您当前网络协议为<span style="color:red">https</span>
      是否立即切换？
      
      😀如果切换失败请自行百度浏览器设置
      `,
      allowHtml: true,
    })
      .then(() => {
        // on confirm 确认切换网络协议
        window.location.href = window.location.href.replace('https', 'http')//强制使用http协议
      })
      .catch(() => {
        // on cancel 取消切换网络协议
        console.log(
          `当前网络协议为：==>%c${window.location.protocol}`,
          'color: #fff;background: #000;padding: 2px 8px;border-radius: 5px;',
          '<==请切换到http协议'
        )
      });
  } else {
    console.log(
      `当前网络协议为：==> %c${window.location.protocol}`,
      'color: #fff;background: #000;padding: 2px 8px;border-radius: 5px; font-weight: bold;',
    )
  }
})

</script>

<style scoped>
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>