<template>
  <div class="recommendNewSong">
    <div v-for="item in newSong">
      <SongCard :config="item" />
    </div>
  </div>
</template>

<script setup>
import SongCard from '@/components/SongCard/index.vue'//歌曲卡片
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const { newSong } = storeToRefs(useDiscoverStore())
const { getpersonalizedNewSong } = useDiscoverStore()

await getpersonalizedNewSong()

// const props = defineProps({
//   newSong: Array
// })
</script>

<style scoped>
.recommendNewSong {
  display: flex;
  flex-direction: column;
  padding: 0px 16px 16px 16px;
}
</style>