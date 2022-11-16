<template>
  <div class="recommentNewAlbum">
    <swiper :slidesPerView="'auto'" class="mySwiper">
      <swiper-slide v-for="item in newAlbumSlice">
        <div class="card">
          <AlbumCard v-for="item1 in item" :config="item1" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import AlbumCard from '@/components/AlbumCard/index.vue'//专辑卡片
// Import Swiper Vue.js components and styles
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { computed } from 'vue';
import { storeToRefs } from 'pinia';// 解决响应式丢失问题
import { useDiscoverStore } from "@/stores/discover.js"

const { newAlbum } = storeToRefs(useDiscoverStore())
const { getalbumNewest } = useDiscoverStore()

await getalbumNewest()

// 分割专辑数组数据，每三为个一组
const newAlbumSlice = computed(() => {
  const arr = []
  for (let i = 0; i < newAlbum.value.length; i += 3) {
    arr.push(newAlbum.value.slice(i, i + 3))
  }
  return arr
})
</script>

<style lang="less" scoped>
.recommentNewAlbum {
  height: auto;
  width: 100%;

  .card {
    margin-left: 16px;
    height: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .swiper {
    width: 100%;
    height: 240px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-slide {
    width: 90%;
  }

  .swiper-slide:last-child {
    width: 100%;
  }
}
</style>