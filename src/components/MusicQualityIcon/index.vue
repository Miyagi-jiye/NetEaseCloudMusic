<template>
  <div class="MusicQualityIcon" @click="show = true">
    <span>{{ filterQuality(active) }}</span>
  </div>
  <van-action-sheet v-model:show="show" teleport="body">
    <div class="MusicQuality">
      <span class="MusicQuality__title">音质</span>
      <div class="MusicQuality__line"></div>
      <div v-if="song.m" class="MusicQuality__item" @click="switchQuality('standard')"
        :class="active == 'standard' ? 'activeQuality' : ''">
        标准（{{ filterSize(song.m.size) }}M）
      </div>
      <div v-if="song.h" class="MusicQuality__item" @click="switchQuality('exhigh')"
        :class="active == 'exhigh' ? 'activeQuality' : ''">
        极高（{{ filterSize(song.h.size) }}M）
      </div>
      <div v-if="song.sq" class="MusicQuality__item" @click="switchQuality('lossless')"
        :class="active == 'lossless' ? 'activeQuality' : ''">
        无损（{{ filterSize(song.sq.size) }}M）
      </div>
      <div v-if="song.hr" class="MusicQuality__item" @click="switchQuality('hires')"
        :class="active == 'hires' ? 'activeQuality' : ''">
        Hi-Res（{{ filterSize(song.hr.size) }}M）
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

const props = defineProps({
  song: Object,// 歌曲信息
  active: String,// 当前音质
})
const emit = defineEmits(['switch'])

// 过滤音质显示
const filterQuality = (quality) => {
  switch (quality) {
    case 'standard':
      return '标准'
    case 'exhigh':
      return '极高'
    case 'lossless':
      return '无损'
    case 'hires':
      return 'Hi-Res'
    default:
      return '标准'
  }
}
// 过滤音质大小
const filterSize = (size) => {
  return (size / 1024 / 1024).toFixed(2)
}

// 切换音质
const switchQuality = (quality) => {
  show.value = false
  emit('switch', quality)// 触发切换音质事件,传递音质参数
}

</script>

<style scoped lang="less">
.MusicQualityIcon {
  font-size: 12px;
  font-weight: bold;
  padding: 3px 6px;
  /* border: 1px solid #cfcfcf; */
  border-radius: 4px;
  box-sizing: border-box;
  line-height: 1;
  cursor: pointer;
  background: #cfcfcf;
  color: #4a4a4a;
}

.MusicQuality {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  transition: all 0.3s;

  &__title {
    font-size: 14px;
    padding: 16px;
  }

  &__line {
    height: 1px;
    background-color: #e5e5e5;
  }

  &__item {
    padding: 16px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: var(--song-list-hover);
    }
  }

  .activeQuality {
    color: red;
    font-weight: bold;
  }
}
</style>