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
      message: '该demo使用"http协议"进行网络连接,请切换到http协议进行访问',
    })
      .then(() => {
        // on confirm 确认切换网络协议
        window.location.href = window.location.href.replace('https', 'http')//强制使用http协议
      })
      .catch(() => {
        // on cancel 取消切换网络协议
        alert(`当前网络协议为：==> ${window.location.protocol} <==，请切换到http协议`)
      });
  } else {
    showConfirmDialog({
      title: '注意！！',
      message: '该demo使用 "http" 协议进行网络连接,您当前网络协议为http,请继续访问',
    })
      .then(() => {
        // on confirm 确认
      })
      .catch(() => {
        // on cancel 取消
      });
  }
})

</script>

<style scoped>
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>