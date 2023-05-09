<template>
  <div class="songListDetail__content" ref="root">
    <!-- 收藏，评论，分享 -->
    <SubCard class="subCard" height="40px" />
    <!-- 操作栏 -->
    <FunctionBar :songs="songListDetail.playlist.tracks" />
    <!-- 歌曲列表 -->
    <div class="songList">
      <SongListItem v-for="(item, index) in songListDetail.playlist.tracks" :config="item" :index="index" />
    </div>
    <!-- 加载更多 -->
    <LoadMore v-if="songListDetail.playlist.tracks.length < songListDetail.playlist.trackIds.length" :root="root"
      :loading="loading" @loadMore="loadMore" />
  </div>
</template>

<script setup>
import LoadMore from '@/components/LoadMore/index.vue'// 加载更多
import SubCard from '@/views/songListDetail/components/subCard.vue'// 引入收藏，评论，分享组件
import SongListItem from "@/components/SongListItem/index.vue"// 歌曲列表项
import FunctionBar from '@/views/songListDetail/components/functionBar.vue'// 操作栏
import { useSongListDetailStore } from '@/stores/songListDetail.js'
import { ref } from 'vue'

const loading = ref(false)// 是否显示加载中
const root = ref(null)// 需要监听可见性的根节点
const { songListDetail, getPlaylistTrackAll } = useSongListDetailStore();

// 加载更多
async function loadMore() {
  loading.value = true// 显示加载中
  songListDetail.trackAllParams.offset++;// 下一页
  const res = await getPlaylistTrackAll();
  if (res) loading.value = false// 隐藏加载中
}
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