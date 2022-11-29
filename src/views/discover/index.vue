<template>
  <div class="discover">
    <Banner />
    <Menu />
    <Title title="最新专辑" />
    <RecommentNewAlbum />
    <Title title="推荐歌单" />
    <RecommendSongList />
    <Title title="新歌速递" />
    <RecommendNewSong />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Title from '@/components/Title/index.vue'//标题
// import Banner from "@/views/discover/components/banner/index.vue"

// 异步懒加载组件
const Banner = defineAsyncComponent(() => import('./components/banner/index.vue'))//轮播图
const Menu = defineAsyncComponent(() => import('./components/menu/index.vue'))//菜单
const RecommendNewSong = defineAsyncComponent(() => import('./components/recommendNewSong/index.vue'))//新歌速递
const RecommendSongList = defineAsyncComponent(() => import('./components/recommendSongList/index.vue'))//推荐歌单
const RecommentNewAlbum = defineAsyncComponent(() => import('./components/recommentNewAlbum/index.vue'))//推荐最新专辑
</script>

<script>
export default { name: "discover" }
</script>

<style scoped>
.discover {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
</style>