<template>
  <LoadingPage v-if="loading" />
  <div class="follow" v-else>123456789</div>
</template>

<script setup>
// 在页面没有加载完成之前，显示加载中的页面
import LoadingPage from '@/components/LoadingPage/index.vue'// 加载中
import { ref, onMounted } from 'vue';

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>