<template>
  <!-- <div class="follow"> -->
  <!-- <iframe src="https://kaifa.baidu.com/" frameborder="0" style="width: 100%;;height: 100%;"></iframe> -->
  <songListDetailSkeleton />
  <!-- </div> -->
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAudioStore } from '@/stores/Audio.js'
import songListDetailSkeleton from '@/views/layout/components/main/skeleton/songListDetail.vue'

const { audio, audioData } = useAudioStore()
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