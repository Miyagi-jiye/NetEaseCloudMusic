<template>
  <div class="main">
    <!-- <router-view /> -->
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition>
          <KeepAlive>
            <Suspense>
              <component :is="Component"></component>
              <template #fallback>
                <discoverSkeleton v-if="route.name == 'discover'" />
                <div v-else>没有骨架屏====>{{ route.name }}</div>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup>
import discoverSkeleton from "./skeleton/discover.vue";// 发现页骨架屏
</script>

<style scoped lang="less">
// 定义过渡动画
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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