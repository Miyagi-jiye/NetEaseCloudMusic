<template>
  <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="mySwiper">
    <swiper-slide v-for="item in songs" :key="item.id"
      :style="{backgroundImage:'url('+item.al.picUrl+'?param=200y200)'}">
      <div class="title">
        <div class="left">
          <span class="ar">
            <span v-for="ar in item.ar">
              {{ar.name}}
            </span>
          </span>
          <span class="name">
            {{item.name}}<span v-if="item.alia[0]">（{{item.alia[0]}}）</span>
          </span>
        </div>
        <div class="right">
          <van-icon name="music-o" />
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";

const modules = [EffectCards]// swiper功能模块

defineProps({
  songs: {
    type: Array,
    default: () => ([
      {
        id: 123,
        ar: [{ name: 'So Far Away (Acoustic)' }],
        al: { picUrl: 'http://p3.music.126.net/imqSqgUzzZFComnZ_9XZzg==/109951163574982396.jpg' },
        name: 'So Far Away (Acoustic)',
        alia: [],
      },
    ])
  },
  size: {
    type: Number,
    default: 200
  }
})
</script>

<style scoped lang="less">
.swiper {
  width: 200px;
  height: 200px;
}

.swiper-slide-active {
  box-shadow: rgb(38, 57, 77) 0px 10px 30px -10px;
}

.swiper-slide {
  // border-radius: 8px;
  color: #fff;
  background-size: cover;
  position: relative;
  border: 2px solid;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    z-index: 1;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.315), hsla(0, 0%, 100%, 0));
    height: 30%;
  }
}

.title {
  position: absolute;
  bottom: 0;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  z-index: 2;
  transition: all 0.3s;
  display: flex;
  gap: 16px;

  .left {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .name {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ffffffa2;
    }

    .ar {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      span:not(:last-child)::after {
        content: "/";
        margin: 0 4px;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
  }
}
</style>