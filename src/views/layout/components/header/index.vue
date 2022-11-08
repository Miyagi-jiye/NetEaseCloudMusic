<template>
  <div class="header">
    <van-nav-bar>
      <template #left>
        <van-icon name="wap-nav" size="24" @click="wapNavClick" />
      </template>
      <template #title>
        <van-search v-model="searchKey" placeholder="请输入搜索关键词" input-align="center" shape="round" />
      </template>
      <template #right>
        <van-icon name="setting" size="24" @click="settingClick" />
      </template>
    </van-nav-bar>
    <van-popup v-model:show="show" position="left" :style="{ height: '100%', width: '80vw' }">
      <slot name="default">
        <Popup />
      </slot>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import Popup from "./components/popup.vue"

const searchKey = ref('')
const show = ref(false)
const theme = inject('theme')// 获取根节点组件传递的值

function settingClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
function wapNavClick() {
  show.value = !show.value
}
</script>

<style scoped>
:deep(.van-search) {
  padding: 0;
}

:deep(.van-search__field) {
  height: 28px;
  padding: 0;
}

:deep(.van-nav-bar__title) {
  flex: 1;
}

:deep(.van-cell) {
  /* padding: 0; */
  background: none;
}

:deep(.van-search__content) {
  /* padding-left: var(--van-padding-sm);
  padding-right: var(--van-padding-sm); */
  padding: 0 var(--van-padding-sm);
}
</style>