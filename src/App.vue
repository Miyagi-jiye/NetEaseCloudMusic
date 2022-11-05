<template>
  <van-config-provider :theme="theme">
    <RouterView />
  </van-config-provider>
</template>

<script setup>
import { ref, provide } from 'vue'
const theme = ref('light')
provide('theme', theme)
// 判断网络协议，如果是https则使用http
if (window.location.protocol === 'https:') {
  window.location.href = window.location.href.replace('https', 'http')//强制使用http协议
  alert("当前网络协议", window.location.protocol)
} else {
  alert("当前网络协议", window.location.protocol)
}
</script>

<style scoped>
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>