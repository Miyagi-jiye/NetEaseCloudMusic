<template>
  <div class="recommentNewAlbum">
    <van-swipe :loop="false" :height="240" width="80%" :show-indicators="false">
      <van-swipe-item v-for="item in newAlbumSlice">
        <div class="card">
          <AlbumCard v-for="item1 in item" :config="item1" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import AlbumCard from '@/components/AlbumCard/index.vue'//专辑卡片
import { computed } from 'vue';
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const { newAlbum } = storeToRefs(useDiscoverStore())
const { getalbumNewest } = useDiscoverStore()

await getalbumNewest()

// const props = defineProps({
//   // 新专辑数据
//   newAlbum: Array,
// })

// 分割专辑数组数据，每三为个一组
const newAlbumSlice = computed(() => {
  const arr = []
  for (let i = 0; i < newAlbum.value.length; i += 3) {
    arr.push(newAlbum.value.slice(i, i + 3))
  }
  // console.log("专辑数据分组切割", arr)// 专辑数据分组切割 (3) [Array(3), Array(3), Array(3)]
  return arr
})

</script>

<style scoped lang="less">
.recommentNewAlbum {
  height: auto;
  width: 100%;

  .card {
    margin-left: 16px;
    // background-color: white;
    height: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>