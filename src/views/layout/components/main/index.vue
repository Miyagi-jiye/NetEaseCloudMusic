<template>
  <div class="main">
    <!-- <router-view /> -->
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <!-- <Transition name="slide-fade"> -->
        <KeepAlive :include="['discover']">
          <Suspense timeout="0">
            <template #default>
              <!-- <Transition name="slide-fade"> -->
              <component :is="Component" :key="route.path"></component>
              <!-- </Transition> -->
            </template>
            <template #fallback>
              <DiscoverSkeleton v-if="route.name == 'discover'" />
              <SongListDetailSkeleton v-else-if="route.name == 'songListDetail'" />
              <!-- <div v-else>没有骨架屏====>{{ route.name }}</div> -->
              <LoadingPage v-else />
            </template>
          </Suspense>
        </KeepAlive>
        <!-- </Transition> -->
      </template>
    </RouterView>
  </div>
</template>

<script setup>
import LoadingPage from '@/components/loadingPage/index.vue';
import DiscoverSkeleton from "./skeleton/discover.vue";// 发现页骨架屏
import SongListDetailSkeleton from "./skeleton/songListDetail.vue";// 歌单详情页骨架屏
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
  transform: translateY(500px);
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>