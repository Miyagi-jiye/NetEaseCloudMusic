<template>
  <div class="Audio">
    <div class="left">
      <div class="play" :style="{ animationPlayState: audioData.isPlay ? 'running' : 'paused' }">
        <img :src="disc" alt="唱片" class="discImg">
        <img v-lazy="audioData.song.al.picUrl + '?param=50y50'" alt="图片" class="songImg">
      </div>
    </div>
    <div class="center nowrap" @click="show = true">
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
    <!-- 播放弹出框 -->
    <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">
      <div class="popup">
        <div class="popup__top">
          <div class="popup__top__left" @click="show = false">
            <van-icon name="arrow-down" size="24" />
          </div>
          <div class="popup__top__center">
            <span>
              {{ audioData.song.name }}
              <span v-if="audioData.song.alia[0]">（{{ audioData.song.alia[0] }}）</span>
            </span>
            <span>{{ audioData.song.ar[0].name }}</span>
          </div>
          <div class="popup__top__right">
            <van-icon name="share-o" size="24" />
          </div>
        </div>
        <div class="popup__center">
          <img class="pointer" :src="pointer" alt="指针" @click="play(true)"
            :style="audioData.isPlay ? 'transform: translateX(-10px) rotate(0deg)' : 'transform: translateX(-10px) rotate(-20deg)'">
          <img class="disc" :src="disc" alt="唱片" @click="play(false)">
          <img class="cover" v-lazy="audioData.song.al.picUrl + '?param=250y250'" alt="封面"
            :style="audioData.isPlay ? 'animation-play-state: running' : 'animation-play-state: paused'" />
        </div>
        <div class="popup__bottom">
          <!-- 播放进度条 -->
          <div class="progress">
            <span>{{ formatTime(currentTime) }}</span>
            <van-slider v-model="sliderValue" @change="onChange" :min="0" :max="Math.floor(audio.duration)">
              <template #button>
                <div class="custom-button">自定义进度条图标</div>
              </template>
            </van-slider>
            <span>{{ formatTime(audio.duration) }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { formatTime } from '@/utils/useFilter.js'// 时间格式化
// import PlayPopup from '@/components/PlayPopup/index.vue'// 引入播放弹窗组件
import PlayListIcon from "@/components/PlayListIcon/index.vue"// 引入播放列表图标组件
import disc from "@/assets/icons/ewj.png";// 唱片
import pointer from "@/assets/icons/fd6.png";// 指针
import { useAudioStore } from '@/stores/Audio.js';
import { ref } from 'vue'

const { audioData, play, audio } = useAudioStore();
const show = ref(false)
const sliderValue = ref(0)// 进度条的值
const currentTime = ref(0)// 当前播放时间
// 监听播放时间更新的事件
audio.ontimeupdate = () => {
  currentTime.value = Math.floor(audio.currentTime)// 更新当前播放时间
  sliderValue.value = Math.floor(audio.currentTime)
}

// 滑块改变时触发
const onChange = (value) => {
  audio.currentTime = Math.floor(value)
}
</script>

<style scoped lang="less">
.popup {
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .popup__top {
    display: flex;
    align-items: center;
    gap: 16px;

    .popup__top__center {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .popup__center {
    flex: 1;
    background-color: rgb(134, 134, 134);
    position: relative;
    min-height: 400px; // 最小高度,防止指针和唱片超出弹窗
    overflow: hidden;
    // 禁止
    user-select: none;
    -webkit-user-drag: none;

    .pointer {
      position: absolute;
      top: 0;
      left: 50%;
      width: 100px;
      // height: 100%;
      aspect-ratio: 4 / 7;
      // transform: translateX(-10px) rotate(0deg); //停止播放时的指针角度为：-20deg
      transform-origin: 15px 15px; // 旋转中心点(x,y,z)
      transition: transform 0.3s;
      z-index: 2;
    }

    .disc {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 110px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }

    .cover {
      border-radius: 50%;
      width: 170px;
      height: 170px;
      position: absolute;
      top: 150px;
      z-index: 0;
      // left: 50%;
      // transform: translateX(-50%);// transform和animation不能同时使用
      // 左右居中
      margin: 0 auto;
      left: 0;
      right: 0;
      // 
      animation: discRotate 20s linear infinite;
      // animation-play-state: paused; // 暂停动画
      // animation-play-state: running; // 恢复动画
    }
  }

  .popup__bottom {
    display: flex;
    flex-direction: column;

    .progress {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;

      .custom-button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgb(255, 0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition: all .3s;

        &:hover {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

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