<template>
  <div class="albumListDetail"></div>
</template>

<script setup>
import { useAlbumListDetailStore } from '@/stores/albumListDetail.js'
import { watch } from 'vue'
import { useRoute } from 'vue-router';

const { albumListDetail, getAlbumDetail } = useAlbumListDetailStore();
const route = useRoute();

// 初始化执行一次,等待数据返回
await getAlbumDetail(route.query.id);// 获取专辑详情

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/albumListDetail') getAlbumDetail(newId);
});
</script>

<style scoped>

</style>