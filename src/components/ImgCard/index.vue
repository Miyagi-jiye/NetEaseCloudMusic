<template>
  <div class="ImgCard" :style="{ height: height, width: width }">
    <!-- 有图片地址 -->
    <img v-if="imgUrl" v-lazy="imgUrl + '?param=200y200'" alt="" class="ImgCard__img">
    <!-- 没有图片地址 -->
    <div v-else class="ImgCard__img"></div>
    <!-- 背景 -->
    <div class="ImgCard__bg"></div>
    <!-- 前景 -->
    <div v-show="fg == true" class="ImgCard__fg">
      <!-- 前景插槽：需要开启前景显示才可生效 -->
      <slot name="fg">
        <van-icon name="like" size="2rem" color="#fff" />
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  height: {
    type: String,
    default: '64px'
  },
  width: {
    type: String,
    default: '64px'
  },
  fg: {
    type: Boolean,
    default: false
  },
  imgUrl: String,
})
</script>

<style scoped lang="less">
.ImgCard {
  // width: 64px;
  // height: 64px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  // cursor: pointer;
  // filter: brightness(110%);
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px;

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    z-index: 1;
    background: #ababab;
  }

  // 前景遮罩
  &__fg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // 水平垂直居中
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  // 背景遮罩
  &__bg {
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translate(-50%);
    width: 85%;
    height: 85%;
    background: var(--card-color);
    border-radius: 10px;
    opacity: .3;
    z-index: -1;
  }
}
</style>