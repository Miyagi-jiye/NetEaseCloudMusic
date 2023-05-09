<template>
  <div class="songListDetail__header">
    <van-icon class="left" name="arrow-left" size='23' @click="$router.back()" />
    <div class="right">
      <span>歌单</span>
      <div class="right__right">
        <van-icon name="search" size='23' />
        <van-icon name="ellipsis" size='23' />
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
.songListDetail__header {
  height: 46px;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 16px;
  // 透明背景
  background: transparent;
  // position: sticky;
  // top: 0;
  z-index: 11;
  transition: all .3s;

  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 16px;

    &__right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
}
</style>