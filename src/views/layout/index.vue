<template>
  <div class="layout">
    <Header v-if="isHide == false" />
    <Main id="backTop" />
    <Footer v-if="isHide == false" />
  </div>
</template>

<script setup>
import Main from '@/views//layout/components/main/index.vue'
import Header from '@/views//layout/components/header/index.vue'
import Footer from "@/views//layout/components/footer/index.vue"
import { useHideHeaderFooter } from "@/hooks/index.js"
import { onBeforeUpdate } from "vue";// #backTop 滚动条回到顶部

// 判断是否隐藏头部和底部
const isHide = useHideHeaderFooter()

// 数据更新前执行，用于切换页面滚动条自动回到顶部
onBeforeUpdate(() => {
  document.querySelector('#backTop').scrollTop = 0;
});
</script>

<style scoped lang="less">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    height: 46px;
  }

  .main {
    flex: 1;
    overflow-y: scroll;
    background-color: var(--van-search-content-background);
  }

  .footer {
    height: 50px;
  }
}
</style>