<template>
  <div class="banner">
    <van-swipe :autoplay="3000" lazy-render style="height: 100%;font-size: 0;border-radius: 8px;">
      <van-swipe-item v-for="item in banners" :key="item.imageUrl">
        <img v-lazy="item.imageUrl" style="width: 100%;height: 100%;aspect-ratio: 2.7 / 1;" />
        <van-tag type="primary" color="#ffffffcc" text-color="#3b3b3bcc"
          style="border-radius:4px;padding: 2px 4px;font-weight: bold;font-size: 12px;">{{ item.typeTitle }}
        </van-tag>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const { banners } = storeToRefs(useDiscoverStore())
const { getbanners } = useDiscoverStore()

await getbanners()

// const props = defineProps({
//   banners: {
//     type: Array,
//     default: () => []
//   }
// })
</script>

<style scoped>
.banner {
  padding: 8px 16px 0px 16px;
}

:deep(.van-tag) {
  position: absolute;
  bottom: 8px;
  right: 8px;
}
</style>