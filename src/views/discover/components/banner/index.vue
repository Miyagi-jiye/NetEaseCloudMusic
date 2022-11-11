<template>
  <div class="banner">
    <swiper :modules="modules" :autoplay="{ delay: 3000, disableOnInteraction: false, }" :loop="true"
      :pagination="{ dynamicBullets: true }" :spaceBetween="30" class="mySwiper">
      <swiper-slide v-for="item in banners" :key="item.imageUrl">
        <img v-lazy="item.imageUrl" style="width: 100%;height: 100%;aspect-ratio: 2.7 / 1;" />
        <van-tag type="primary" color="#ffffffcc" text-color="#3b3b3bcc"
          style="border-radius:4px;padding: 2px 4px;font-weight: bold;font-size: 12px;">{{ item.typeTitle }}
        </van-tag>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper";

import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const modules = [Pagination, Autoplay]// swiper功能模块

const { banners } = storeToRefs(useDiscoverStore())
const { getbanners } = useDiscoverStore()

await getbanners()
</script>

<style lang="less" scoped>
:deep(.van-tag) {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.banner {
  padding-top: 8px;
}

:deep(.swiper-pagination-bullets-dynamic) {
  left: 60px !important;

  span {
    background-color: #ffffffcc;
  }
}

.swiper {
  width: 100%;
  height: auto;
  padding: 0 16px;
  box-sizing: border-box;
}

.swiper-slide {
  overflow: hidden;
  display: block;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>