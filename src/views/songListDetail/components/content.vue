<template>
  <div class="songListDetail__content">
    <!-- 收藏，评论，分享 -->
    <SubCard class="subCard" height="40px" />
    <!-- 操作栏 -->
    <FunctionBar />
    <!-- 歌曲列表 -->
    <div class="songList">
      <SongListItem v-for="(item, index) in songListDetail.playlist.tracks" :config="item" :index="index" />
    </div>
  </div>
</template>

<script setup>
import SubCard from '@/views/songListDetail/components/subCard.vue'// 引入收藏，评论，分享组件
import SongListItem from "@/components/SongListItem/index.vue"// 歌曲列表项
import FunctionBar from '@/views/songListDetail/components/functionBar.vue'// 操作栏
import { useSongListDetailStore } from '@/stores/songListDetail.js'

const { songListDetail, getPlaylistDetail } = useSongListDetailStore();
</script>

<style scoped lang="less">
.songListDetail__content {
  position: relative;
  padding-top: 32px;
  background-color: var(--card-background-color);
  flex: 1;

  .subCard {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .songList {
    display: flex;
    flex-direction: column;
  }
}
</style>