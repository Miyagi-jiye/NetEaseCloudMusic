<template>
  <div class="layout">
    <!-- <Transition name="slide-fade-up" appear> -->
    <Header v-if="isHide == false" />
    <!-- </Transition> -->

    <Main id="backTop" />

    <Transition name="slide-fade" appear>
      <AudioCard v-if="audioData.songs.length > 0" />
    </Transition>

    <Transition name="slide-fade" appear>
      <Footer v-if="isHide == false" />
    </Transition>
  </div>
</template>

<script setup>
import AudioCard from '@/components/AudioCard/index.vue'
import Main from '@/views//layout/components/main/index.vue'
import Header from '@/views//layout/components/header/index.vue'
import Footer from "@/views//layout/components/footer/index.vue"
import { useHideHeaderFooter } from "@/hooks/index.js"
import { useAudioStore } from "@/stores/Audio.js"
import { watch } from "vue";// #backTop 滚动条回到顶部
import { useRoute } from "vue-router"

const route = useRoute()
const { audioData, play } = useAudioStore()
// 判断是否隐藏头部和底部
const isHide = useHideHeaderFooter()

// 监听路由更新，切换页面滚动条自动回到顶部
watch(route, () => {
  document.getElementById('backTop').scrollTop = 0
})
// 监听浏览器页面刷新，如果刷新就让播放状态为false
window.onbeforeunload = () => {
  play(false)// 暂停播放
}
</script>

<style scoped lang="less">
// 底部淡出动画
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

// 头部淡出动画
.slide-fade-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-up-enter-from,
.slide-fade-up-leave-to {
  transform: translateY(-50px);
  opacity: 1;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  .header {
    height: 46px;
  }

  .main {
    flex: 1;
    overflow: hidden;
    background-color: var(--van-search-content-background);
  }

  .footer {
    height: 50px;
  }
}
</style>