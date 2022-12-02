<template>
  <div class="discover-skeleton">
    <!-- 轮播图 -->
    <van-skeleton :row="1" class="banner" />
    <!-- 菜单 -->
    <div class="menu">
      <van-skeleton class="menu__item" v-for="item in 12" :row="1" />
    </div>
    <!-- 最新专辑 -->
    <van-skeleton :row="1" class="title" />
    <div class="newAlbum">
      <div class="newAlbum__item" v-for="item in 3">
        <van-skeleton :row="1" style="height: 60px;aspect-ratio: 1 / 1;margin-right: 16px;" />
        <div style="display:flex;flex-direction: column;flex: 1;gap: 8px;">
          <van-skeleton :row="1" style="height: 14px;width: 100%;" />
          <van-skeleton :row="1" style="height: 12px;width: 100%;" />
          <van-skeleton :row="1" style="height: 12px;width: 100%;" />
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <van-skeleton :row="1" class="title" />
    <div class="songlist">
      <div v-for="item in 12">
        <van-skeleton :row="1" style="height: 128px;aspect-ratio: 1 / 1;" />
        <van-skeleton :row="1" style="height: 32px;margin-top: 12px;" />
      </div>
    </div>
    <!-- 新歌速递 -->
    <van-skeleton :row="1" class="title" />
    <div class="newSong">
      <div class="newSong__item" v-for="item in 10">
        <van-skeleton :row="1" style="height: 60px;aspect-ratio: 1 / 1;margin-right: 16px;" />
        <div style="display:flex;flex-direction: column;flex: 1;gap: 8px;">
          <van-skeleton :row="1" style="height: 14px;width: 100%;" />
          <van-skeleton :row="1" style="height: 12px;width: 100%;" />
          <van-skeleton :row="1" style="height: 12px;width: 100%;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="less">
:deep(.van-skeleton__row) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 8px !important;
}

:deep(.van-skeleton) {
  padding: 0 !important;
}

:deep(.van-skeleton-paragraph) {
  width: 100% !important;
  height: 100% !important;
}

.title {
  margin: 16px 0;
  height: 21px;
  padding: 0 16px !important;
}

.banner {
  margin: 8px 0;
  padding: 0 16px !important;
  aspect-ratio: 2.7 / 1;
}

.menu {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  overflow: hidden;
  padding: 0 16px !important;
  gap: 12px;

  &__item {
    height: 64px;
    aspect-ratio: 1 / 1;
  }
}

.songlist {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  overflow: hidden;
  padding: 0 16px !important;
  gap: 12px;
}

.newAlbum {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 16px !important;

  &__item {
    display: flex;
    align-items: center;
  }
}

.newSong {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 16px !important;

  &__item {
    display: flex;
    align-items: center;
  }
}
</style>