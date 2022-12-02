<template>
  <div class="songListDetail-skeleton">
    <!-- 导航栏 -->
    <van-skeleton :row="1" class="header" />
    <!-- 图片信息 -->
    <div class="info">
      <van-skeleton :row="1" class="img" />
      <div class="right">
        <van-skeleton :row="1" class="desc" v-for="item in 4" />
      </div>
    </div>
    <!-- 歌曲 -->
    <div class="bottom">
      <van-skeleton :row="1" class="subCard" />
      <van-skeleton :row="1" class="songListTitle" />
      <div class="songListItem">
        <van-skeleton :row="1" class="item" v-for="item in 10" />
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
}

:deep(.van-skeleton) {
  padding: 0 !important;
}

:deep(.van-skeleton-paragraph) {
  width: 100% !important;
  height: 100% !important;
}

.songListDetail-skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .header {
    height: 46px;
  }

  .info {
    display: flex;
    gap: 16px;
    padding: 32px 16px;

    .img {
      height: 110px;
      width: 110px;
      border-radius: 8px;
      overflow: hidden;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      flex: 1;

      .desc {
        height: 20px;
        border-radius: 4px;
        overflow: hidden;

        &:nth-child(1) {
          width: 50%;
        }

        &:nth-child(2) {
          width: 70%;
        }

        &:nth-child(3) {
          width: 40%;
        }
      }
    }
  }

  .bottom {
    height: 100%;
    position: relative;
    flex: 1;
    padding-top: 32px;
    box-sizing: border-box;

    .subCard {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translate(-50%);
      height: 40px;
      width: 70%;
      border-radius: 25px;
      overflow: hidden;
    }

    .songListTitle {
      height: 41px;
      width: 100%;
    }

    .songListItem {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;

      .item {
        height: 39px;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
}
</style>