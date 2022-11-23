<template>
  <div class="follow">
    <span>{{ formatTime(currentTime) }}</span>
    <van-slider v-model="sliderValue" @change="onChange">
      <template #button>
        <div class="custom-button">{{ sliderValue }}%</div>
      </template>
    </van-slider>
    <span>{{ formatTime(audio.duration) }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAudioStore } from '@/stores/Audio.js'
import { formatTime } from '@/utils/useFilter.js'

const { audio, audioData } = useAudioStore()
const sliderValue = ref(0)// 进度条百分比
const currentTime = ref(0)// 当前播放时间

// 监听播放时间更新的事件
audio.ontimeupdate = () => {
  currentTime.value = Math.floor(audio.currentTime)// 更新当前播放时间
  sliderValue.value = Math.floor((audio.currentTime / audio.duration) * 100)// 进度条百分比
}

// 滑块改变时触发
const onChange = (value) => {
  audio.currentTime = Math.floor(audio.duration * (value / 100))
}

</script>

<style scoped lang="less">
.follow {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 50px;
}

.custom-button {
  width: 50px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: var(--van-primary-color);
  border-radius: 100px;
}
</style>