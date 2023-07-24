<template>
  <van-config-provider :theme="theme">
    <RouterView />
  </van-config-provider>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import { showConfirmDialog } from "vant";

//主题切换
const theme = ref("light");
provide("theme", theme);
</script>

<style scoped>
.van-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
</style>
