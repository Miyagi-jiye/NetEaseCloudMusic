<template>
  <div class="subCard" :style="{ height: height, width: width }">
    <!-- 收藏，评论，分享 -->
    <div class="subscribedCount">
      <van-icon name="passed" size="20" />
      <span>收藏</span>
    </div>
    <span class="my-line"></span>
    <div class="commentCount">
      <van-icon name="chat-o" size="20" />
      <span>评论</span>
    </div>
    <span class="my-line"></span>
    <div class="shareCount">
      <van-icon name="share-o" size="20" />
      <span>分享</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 传入的参数
  height: {
    type: String,
    default: '40px'
  },
  width: {
    type: String,
    default: '70%'
  }
})
</script>

<style scoped lang="less">
.subCard {
  // height: 46px;
  // width: 70%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: var(--subCard-background-color);
  box-shadow: var(--song-list-box-shadow);
  z-index: 10;
  overflow: hidden;

  .subscribedCount,
  .commentCount,
  .shareCount {
    height: 100%;
    flex: 1;
    font-size: 14px;
    color: var(--subCard--color);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
}
</style>