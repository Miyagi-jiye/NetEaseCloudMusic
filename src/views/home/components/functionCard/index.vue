<template>
  <div class="functionCard">
    <div class="functionCard__top">
      <div class="functionCard__top__item">
        <van-icon name="music" size="2.5rem" color="#E60026" />
        <div class="functionCard__top__item__title">本地/下载</div>
      </div>
      <div class="functionCard__top__item">
        <van-icon name="play-circle" size="2.5rem" color="#E60026" />
        <div class="functionCard__top__item__title">最近播放</div>
      </div>
      <div class="functionCard__top__item">
        <van-icon name="star" size="2.5rem" color="#E60026" />
        <div class="functionCard__top__item__title">收藏和赞</div>
      </div>
      <div class="functionCard__top__item">
        <van-icon name="goods-collect" size="2.5rem" color="#E60026" />
        <div class="functionCard__top__item__title">已购</div>
      </div>
    </div>
    <van-divider />
    <div class="functionCard__bottom">
      <van-icon name="plus" size="1rem" /><span>音乐应用</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
.functionCard {
  height: auto;
  width: 100%;
  background-color: var(--card-background-color);
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;

  &__top {
    display: flex;
    justify-content: space-around;
    margin-top: 16px;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__title {
        margin-top: 4px;
        color: var(--font-color-dark);
        font-size: 14px;
      }
    }
  }

  &__bottom {
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
    color: var(--font-color-4);
  }
}
</style>