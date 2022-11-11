<template>
  <div class="recommendSongList">
    <div v-for="item in songlist">
      <SongListCard :config="item" />
    </div>
  </div>
</template>

<script setup>
import SongListCard from '@/components/SongListCard/index.vue'//歌单卡片
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const { songlist } = storeToRefs(useDiscoverStore())
const { getpersonalized } = useDiscoverStore()

await getpersonalized()

// const props = defineProps({
//   songlist: Array
// })
</script>

<style scoped lang="less">
.recommendSongList {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: scroll;
  gap: 12px;
  padding: 0 16px;
  scrollbar-width: none; // firefox浏览器隐藏滚动条

  &::-webkit-scrollbar {
    display: none; //隐藏滚动条
    // height: 6px;
  }
}
</style>