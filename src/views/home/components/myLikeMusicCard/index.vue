<template>
  <!-- 接受到数据 -->
  <div class="myLikeMusicCard" v-if="config && isLogin">
    <div class="myLikeMusicCard__left">
      <ImgCard :imgUrl="config.myLikeMusic[0].coverImgUrl" />
    </div>
    <div class="myLikeMusicCard__center" @click="routerPush('/songListDetail', { id: config.myLikeMusic[0].id })">
      <span class="myLikeMusicCard__center__title nowrap">我喜欢的音乐</span>
      <span class="myLikeMusicCard__center__count nowrap">{{ config.myLikeMusic[0].trackCount }}首</span>
    </div>
    <div class="myLikeMusicCard__right">
      <van-icon name="like-o" size="0.8rem" color="#E60026" />
      <span>心动模式</span>
    </div>
  </div>
  <!-- 没接受到数据 -->
  <div class="myLikeMusicCard" v-else>
    <div class="myLikeMusicCard__left">
      <ImgCard :fg="true" />
    </div>
    <div class="myLikeMusicCard__center">
      <div class="myLikeMusicCard__center__title">我喜欢的音乐</div>
      <div class="myLikeMusicCard__center__count">0首</div>
    </div>
    <div class="myLikeMusicCard__right">
      <van-icon name="like-o" size="0.8rem" color="#E60026" />
      <span>心动模式</span>
    </div>
  </div>
</template>

<script setup>
import ImgCard from "@/components/ImgCard/index.vue";
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'
import { useRouter } from "vue-router";

const router = useRouter()//路由
const { isLogin } = storeToRefs(useLoginStore())//登录状态
const props = defineProps({
  config: Object
})

//跳转到歌单详情
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.myLikeMusicCard {
  height: auto;
  width: 100%;
  background-color: var(--card-background-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;

  &__left {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    margin-right: 16px;
    position: relative;
    z-index: 1;

    &__img {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      z-index: 1;
      background: #ababab;
    }

    // 前景遮罩
    &__fg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // 水平垂直居中
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
    }

    // 背景遮罩
    &__bg {
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translate(-50%);
      width: 85%;
      height: 85%;
      background: var(--card-color);
      border-radius: 10px;
      opacity: .3;
      z-index: -1;
    }
  }

  &__center {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    overflow: hidden;

    &__title {
      font-size: 16px;
      color: var(--font-color-dark);
    }

    &__count {
      font-size: 14px;
      color: var(--font-color-4);
    }
  }

  &__right {
    margin-left: 16px;
    font-size: 12px;
    color: var(--font-color-dark);
    display: flex;
    align-items: baseline; // 基线对齐
    gap: 4px;
    border: 1px solid var(--font-color-1);
    border-radius: 20px;
    padding: 4px 8px;
    box-sizing: border-box;

    &:active {
      background-color: var(--font-color-1);
    }
  }
}
</style>