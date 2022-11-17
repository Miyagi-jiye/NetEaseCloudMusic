<template>
  <LoadingPage v-if="loading" />
  <div class="follow" v-else>
    <van-tabs v-model:active="active">
      <van-tab title="标签 1" name="1">内容 1</van-tab>
      <van-tab title="标签 2" name="2">内容 2</van-tab>
      <van-tab title="标签 3" name="3">内容 3</van-tab>
      <van-tab title="标签 4" name="4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
// 在页面没有加载完成之前，显示加载中的页面
import LoadingPage from '@/components/LoadingPage/index.vue'// 加载中
import { ref, onMounted } from 'vue';

const active = ref('3');
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>