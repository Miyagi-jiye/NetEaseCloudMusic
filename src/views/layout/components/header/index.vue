<template>
  <div class="header">

    <van-nav-bar>
      <template #left>
        <van-icon name="wap-nav" size="24" @click="menuClick" />
      </template>
      <template #title>
        <van-search v-model="searchKey" disabled placeholder="请输入搜索关键词" input-align="center" shape="round"
          @click.stop="routerPush('/search')" />
      </template>
      <template #right>
        <van-icon name="setting" size="24" @click="settingClick" />
      </template>
    </van-nav-bar>

    <van-popup v-model:show="leftShow" teleport="body" position="left" :style="{ height: '100%', width: '80vw' }">
      <slot name="default">
        <MenuPopup />
      </slot>
    </van-popup>

  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import MenuPopup from "./components/menuPopup.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const searchKey = ref('')
const leftShow = ref(false)// 左边popup显示状态
const theme = inject('theme')// 获取根节点组件传递的值

// 点击设置黑夜按钮
function settingClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
// 左边菜单点击事件
function menuClick() {
  leftShow.value = !leftShow.value
}
// 跳转到搜索页面
function routerPush(path) {
  router.push({ path })
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