<template>
  <div class="PlayAllFunctionBar">
    <div class="left">
      <van-icon name="play-circle-o" size="25" color="red" @click="addAllToPlayList(songs)" />
      <span>播放全部</span>
      <span>({{ songs.length }})</span>
    </div>
    <div class="right">
      <van-icon name="music-o" size="20" />
      <van-icon name="down" size="20" />
      <van-icon name="wap-nav" size="20" />
    </div>
  </div>
</template>

<script setup>
import { useAudioStore } from "@/stores/Audio.js"

const { addAllToPlayList } = useAudioStore();
const props = defineProps({
  songs: Array,//歌曲列表
})
</script>

<style scoped lang="less">
.PlayAllFunctionBar {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  box-sizing: border-box;
  position: sticky;
  // top: 46px;
  top: 0;
  color: var(--song-list-color);
  background-color: var(--card-background-color);
  z-index: 1;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

    span:nth-child(2) {
      font-size: 16px;
      font-weight: bold;
    }

    span:nth-child(3) {
      font-size: 14px;
      color: #999999;
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>