<template>
  <div class="recommendSongList">
    <swiper slidesPerView="auto" :spaceBetween="16" :freeMode="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="item in songlist">
        <SongListCard :config="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";// 自由模式
import { FreeMode } from "swiper";
// Import Swiper Vue.js components
import SongListCard from '@/components/SongListCard/index.vue'// 歌单卡片组件
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const modules = [FreeMode]// swiper功能模块
const { songlist } = storeToRefs(useDiscoverStore())
const { getpersonalized } = useDiscoverStore()

await getpersonalized()
</script>

<style scoped lang="less">
.swiper-slide {
  width: 128px;

  &:nth-child(1) {
    margin-left: 16px;
  }

  &:last-child {
    margin-right: 16px;
  }
}

.recommendSongList {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: scroll;
  gap: 12px;
  // padding: 0 16px;
  scrollbar-width: none; // firefox浏览器隐藏滚动条

  &::-webkit-scrollbar {
    display: none; //隐藏滚动条
    // height: 6px;
  }
}
</style>