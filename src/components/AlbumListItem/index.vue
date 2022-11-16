<template>
  <div class="AlbumListItem">
    <div class="AlbumListItem__left">
      <img v-lazy="config.picUrl + '?param=100y100'" alt="" />
    </div>
    <div class="AlbumListItem__right">
      <div class="AlbumListItem__right__title">{{ config.name }}</div>
      <div class="AlbumListItem__right__desc">
        <span>{{ config.artist.name }}</span>
        <span>{{ formatDate(config.publishTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/useFilter.js'
const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="less">
.AlbumListItem {
  display: flex;
  align-items: center;
  padding: 16px;

  .AlbumListItem__left {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .AlbumListItem__right {
    flex: 1;
    margin-left: 10px;

    .AlbumListItem__right__title {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
    }

    .AlbumListItem__right__desc {
      display: flex;
      align-items: center;

      span {
        font-size: 12px;
        color: #999;

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>