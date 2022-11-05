<template>
  <div class="layout">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script setup>
import Main from '@/views//layout/components/main/index.vue'
import Header from '@/views//layout/components/header/index.vue'
import Footer from "@/views//layout/components/footer/index.vue"
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