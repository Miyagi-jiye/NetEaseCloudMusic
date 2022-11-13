<template>
  <div class="Audio">
    <div class="left">
      <div class="play" :style="{ animationPlayState: audioData.isPlay ? 'running' : 'paused' }">
        <img :src="disc" alt="唱片" class="discImg">
        <img v-lazy="audioData.song.al.picUrl + '?param=50y50'" alt="图片" class="songImg">
      </div>
    </div>
    <div class="center nowrap">
      {{ audioData.song.name }}<span class="alia" v-if="audioData.song.alia[0]">（{{ audioData.song.alia[0] }}）</span>
    </div>
    <div class="right">
      <!-- 播放中 -->
      <svg v-if="audioData.isPlay" t="1668173002562" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="6132" width="20" height="20" @click="play(false)">
        <path
          d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
          fill="var(--font-color-5)" p-id="6133"></path>
      </svg>
      <!-- 暂停 -->
      <svg v-else t="1668172936808" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="5876" width="20" height="20" @click="play(true)">
        <path
          d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
          fill="var(--font-color-5)" p-id="5877"></path>
      </svg>
      <!-- 播放列表图标 -->
      <PlayListIcon :size="21" />
    </div>
  </div>
</template>

<script setup>
import PlayListIcon from "@/components/PlayListIcon/index.vue"
import disc from "@/assets/icons/ewj.png";// 唱片
import { useAudioStore } from '@/stores/Audio.js';

const { audioData, play } = useAudioStore();
</script>

<style scoped lang="less">
// 定义唱片旋转动画
@keyframes discRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.Audio {
  height: 44px;
  width: 100%;
  background: var(--van-nav-bar-background);
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;

  .left {
    width: 40px;
    height: 40px;
    position: relative;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }

    .play {
      height: 100%;
      width: 100%;
      animation: discRotate 20s linear infinite;
      // 暂停唱片动画
      animation-play-state: paused;
    }

    // 唱片
    .discImg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    // 封面
    .songImg {
      height: 70%;
      width: 70%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .center {
    flex: 1;
    color: var(--font-color-dark);
    font-size: 14px;
  }

  .right {
    width: auto;
    height: 100%;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 20px;

    .playIcon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      // 改变图片颜色
      background-color: var(--font-color-5);
      mask-image: url("@/assets/icons/icon-play-square.png"); // 播放按钮
      mask-size: 100%;
      // 兼容谷歌浏览器
      -webkit-mask-image: url("@/assets/icons/icon-play-square.png");
      -webkit-mask-size: 100%;
    }

    .listIcon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      // 改变图片颜色
      background-color: var(--font-color-5);
      mask-image: url("@/assets/icons/eys.png"); // 播放列表
      mask-size: 100%;
      // 兼容谷歌浏览器
      -webkit-mask-image: url("@/assets/icons/eys.png");
      -webkit-mask-size: 100%;
    }
  }
}
</style>