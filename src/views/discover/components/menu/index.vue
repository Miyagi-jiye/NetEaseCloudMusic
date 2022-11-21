<template>
  <div class="menu">
    <!-- <div v-for="item in dragonBall" class="menu-item" :data-foo="today">
      <i class="icon" :style="`-webkit-mask-image: url(${item.iconUrl})`" />
      <p style="font-size: 12px" class="title">{{ item.name }}</p>
    </div> -->
    <swiper slidesPerView="auto" :spaceBetween="0" :freeMode="true" :modules="modules" class="mySwiper">
      <swiper-slide v-for="item in dragonBall" class="menu-item" :data-foo="today">
        <i class="icon" :style="`-webkit-mask-image: url(${item.iconUrl})`" />
        <p class="title">{{ item.name }}</p>
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
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const modules = [FreeMode]// swiper功能模块
const { dragonBall } = storeToRefs(useDiscoverStore())
const { getdragonBall } = useDiscoverStore()

await getdragonBall()

// 每日推荐的日期
const today = new Date().getDate();
</script>

<style scoped lang="less">
.swiper-slide {
  width: 65px;
}

.menu {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 8px;
  overflow-x: scroll;
  gap: 10px;
  scrollbar-width: none; // firefox浏览器隐藏滚动条

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .icon {
      -webkit-mask-size: 100%;
      mask-size: 100%; // 遮罩层
      background-color: #f9343d;
      height: 4rem;
      width: 4rem;
      margin: 0 0 8px 0;
    }

    // 每日推荐添加当前日期
    &:nth-child(1)::after {
      content: attr(data-foo); // 获取data-foo属性
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -11px);
      color: #ffffffe8;
      font-size: 18px;
      font-weight: bolder;
      height: 20px;
      width: 20px;
      text-align: center;
    }

    .title {
      position: absolute;
      bottom: 0px;
      font-size: 12px;
      color: var(--font-color-4)
    }
  }

  &::-webkit-scrollbar {
    display: none; //隐藏滚动条
    // height: 6px;
  }

  // &::-webkit-scrollbar-track {
  //   background: #f5f5f5;
  //   border-radius: 10px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: #ccc;
  //   border-radius: 10px;
  // }
}
</style>
