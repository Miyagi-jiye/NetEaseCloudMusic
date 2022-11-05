<template>
  <div class="main">
    <!-- <router-view /> -->
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition mode="out-in">
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
.main {
  height: calc(100vh - 50px - 46px); // 50px是头部高度，46px是底部高度
  width: 100%;
  background-color: var(--van-search-content-background);
  overflow-y: scroll;
}
</style>