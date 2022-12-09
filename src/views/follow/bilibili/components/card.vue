<template>
  <!-- 卡片形式 -->
  <div class="bangumi-card">
    <div v-for="item in data" class="card-item" :key="item.season_id" @click="toBilibili(item.url)">
      <!-- 封面 -->
      <img :src="item.cover + '@240w_320h.webp'" alt="" referrerpolicy="no-referrer">
      <!-- 详情 -->
      <div class="desc">
        <span>{{ item.title }}</span>
        <span>{{ item.new_ep.index_show }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// 跳转到bilibili
const toBilibili = (url) => {
  window.open(url)
}
</script>

<style scoped lang="less">
// grid形式
.bangumi-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  justify-items: center;
  padding: 16px;
  box-sizing: border-box;

  .card-item {
    position: relative;
    height: 100%;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .desc {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(rgb(255 255 255 / 0%), rgb(0 0 0 / 70%));

      span {
        display: block;
        font-size: 14px;
        width: 100%;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        box-sizing: border-box;
      }

      span:nth-child(1) {
        font-size: 14px;
        padding: 4px 4px 0 4px;
      }

      span:nth-child(2) {
        font-size: 12px;
        padding: 4px;
      }
    }
  }
}
</style>