<template>
  <div class="SongListCard">
    <div class="card">
      <img v-lazy="config.imageUrl + '?param=200y200'" alt="歌单封面">
      <img :src="wyyIcon" alt="网易云图标" class="wyyIcon">
      <img :src="filledPlayIcon" alt="点击播放" class="playIcon">
      <div class="trackCount">
        <span>{{ config.trackCount }}</span>
        <span>首</span>
      </div>
      <div class="mask" @click="routerPush('/songListDetail', { id: config.songListId })"></div>
      <div class="playCount">
        <van-icon name="play" size="0.6rem" />{{ filterPlayCount(config.playCount) }}
      </div>
    </div>
    <div class="title">{{ config.name }}</div>
  </div>
</template>

<script setup>
import { filterPlayCount } from '@/utils/useFilter.js'// 过滤播放量
import wyyIcon from "@/assets/icons/mipush_small_notification.png"// 网易云图标
import filledPlayIcon from "@/assets/icons/icon-play-square.png"// 播放图标(实心)
import { useRouter } from "vue-router"

const router = useRouter()//路由
const props = defineProps({
  config: {
    // 歌单id
    songListId: Number,
    // 歌单封面
    imageUrl: String,
    // 歌单标题
    name: String,
    // 歌单播放量
    playCount: Number,
    // 歌曲数量
    trackCount: Number,
  }
})

//跳转到歌单详情
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.SongListCard {
  display: flex;
  flex-direction: column;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;

  .card {
    height: 8rem;
    width: 8rem;
    border-radius: 8px;
    // background-color: red;
    position: relative;
    margin: 6px 0;
    z-index: 1;

    .trackCount {
      position: absolute;
      bottom: 4px;
      left: 4px;
      color: #fff;
      font-size: 0.6rem;
      display: flex;
      align-items: center;
      gap: 2px;
      z-index: 2;

      span:nth-child(1) {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // 渐变色，四周到中间
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
      border-radius: 8px;
      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
      font-size: 0;
      border-radius: 8px;
    }

    .wyyIcon {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 1.2rem;
      height: 1.2rem;
      z-index: 2;
      background-color: #00000021;
      border-radius: 50%;
      padding: 2px;
    }

    .playIcon {
      position: absolute;
      bottom: 4px;
      right: 4px;
      width: 0.6rem;
      height: 0.6rem;
      z-index: 2;
      padding: 6px;
      backdrop-filter: blur(8px);
      border: 1px solid #ffffff14;
      color: #fff;
      background: #ffffff24;
      border-radius: 50%;
      cursor: pointer;
    }

    .playCount {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 2;
      padding: 2px;
      color: #fff;
      font-size: 0.6rem;
      display: flex;
      align-items: center;
      // gap: 2px;
    }

    &::after {
      content: "";
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translate(-50%);
      width: 85%;
      height: 85%;
      background: var(--card-color); // 背景卡片颜色
      opacity: 0.3;
      border-radius: 10px;
      z-index: -1;
    }
  }

  .title {
    word-break: break-word;
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 12px;
    color: var(--font-color-dark);
  }
}
</style>