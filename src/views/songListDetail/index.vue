<template>
  <div class="songListDetail">
    <div class="background"
      :style="{ backgroundImage: 'url(' + songListDetail.playlist.coverImgUrl + '?param=10y10)' }">
      <div class="filter">
        <Header />
        <Detail />
        <Content />
      </div>
    </div>
    <!-- 返回顶部 -->
    <van-back-top right="32px" bottom="76px" target=".songListDetail" />
  </div>
</template>

<script setup>
import Content from './components/content.vue'// 歌单详情内容
import Detail from './components/detail.vue'// 详情组件
import Header from './components/header.vue'// 顶部组件
import { useRoute } from 'vue-router'
import { useSongListDetailStore } from '@/stores/songListDetail.js'
import { watch } from 'vue'

const route = useRoute();
const { songListDetail, getPlaylistDetail } = useSongListDetailStore();

// 初始化执行一次,等待数据返回
await getPlaylistDetail(route.query.id);// 获取歌单详情

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/songListDetail') getPlaylistDetail(newId);
  // 离开当前页面
  else songListDetail.trackAllParams.offset = 1;// 重置offset
});
</script>

<style scoped lang="less">
:deep(.van-tag--round) {
  padding: 2px 10px;
  box-sizing: border-box;
  white-space: nowrap;
}

.songListDetail {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;

  .background {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    transition: all .3s; // 过渡动画
  }

  .filter {
    // 滤镜: 饱和度150% 对比度100% 模糊150px 亮度90%
    backdrop-filter: saturate(150%) contrast(100%) blur(150px) brightness(90%);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>