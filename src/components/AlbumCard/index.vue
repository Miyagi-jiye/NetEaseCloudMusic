<template>
  <div class="AlbunCard" @click="routerPush('/albumListDetail', { id: config.albumId })">
    <div class="image">
      <img class="cover" v-lazy="config.imageUrl + '?param=200y200'" alt="专辑封面" />
      <img class="disc" :src="disc" alt="唱片">
      <div class="mask"></div>
      <div class="shadow" :style="'background-image: url(' + config.imageUrl + '?param=10y10)'"></div>
      <!-- <div class="size">
        <span>{{ config.size }}</span>
        <span>首</span>
      </div> -->
    </div>
    <div class="info">
      <h3 class="info__name">{{ config.name }}</h3>
      <p class="info__ar">
        <span v-for="ar in config.ar">{{ ar.name }}</span>
      </p>
      <div class="info__publishTime">
        <van-tag color="var(--tag-color-1)" text-color="var(--tag-background-color-1)">
          {{ formatDate(config.publishTime) }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import disc from "@/assets/icons/crc.png"
import { formatDate } from '@/utils/useFilter.js'
import { useRouter } from "vue-router"

const router = useRouter()//路由
const props = defineProps({
  config: {
    // 专辑id
    albumId: Number,
    // 专辑名
    name: String,
    // 专辑图片
    imageUrl: String,
    // 歌手
    ar: Array,
    // 歌曲数量
    size: Number,
    // 专辑发布时间
    publishTime: Number,
  },
})
//跳转到专辑详情页
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.AlbunCard {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 70px;
  width: 100%;
  overflow: hidden;

  .image {
    position: relative;
    z-index: 1;

    .cover {
      width: 60px;
      height: 60px;
      aspect-ratio: 1 / 1; // 保持图片正方形
      // border-radius: 4px;
      display: block; // 解决图片缝隙问题
      box-sizing: border-box;
      padding: 1px;
      border: 1px solid #ccc;
    }

    // 背景唱片
    .disc {
      width: 50px;
      height: 50px;
      aspect-ratio: 1 / 1; // 保持图片正方形
      position: absolute;
      top: 50%;
      transform: translateY(-50%); // 使唱片垂直居中
      left: 20px;
      z-index: -1;
      // 保证暗黑模式也能看见唱片轮廓
      border: 1px solid #ffffff42;
      border-radius: 50%;
    }

    .mask {
      height: 50px;
      width: 50px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: -3px;
      /* background: #7e7e7e; */
      /* border-radius: 3px; */
      z-index: -2;
      border: 1px solid #ccc;
    }

    .shadow {
      position: absolute;
      top: 6px;
      right: 0px;
      height: 100%;
      width: 100%;
      filter: blur(2px) opacity(0.6);
      transform: scale(.86);
      z-index: -2;
      background-size: cover;
      aspect-ratio: 1 / 1;
    }

    // 专辑歌曲数量
    .size {
      position: absolute;
      bottom: 2px;
      left: 2px;
      color: var(--font-color-light);
      display: flex;
      align-items: center;
      gap: 2px;

      span:nth-child(1) {
        font-size: 14px;
        font-weight: bold;
      }

      span:nth-child(2) {
        font-size: 12px;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    height: 100%;

    .info__name {
      font-size: 14px;
      font-weight: 700;
      color: var(--font-color-dark);
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: normal;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .info__ar {
      font-size: 14px;
      color: var(--font-color-4);
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: normal;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 12px;

      // 添加伪元素分割线，排除最后一个
      span:not(:last-child)::after {
        content: '/';
        margin: 0 4px;
      }
    }

    .info__publishTime {
      display: flex;
    }
  }
}
</style>