<template>
  <div class="FollowButton">
    <!-- 已关注 -->
    <div v-if="followed" class="FollowButton__followed" @click="followClick">
      <van-icon name="success" />
      <span>已关注</span>
    </div>
    <!-- 未关注 -->
    <div v-else class="FollowButton__unfollowed" @click="followClick">
      <van-loading v-if="showLoading" size="12px" color="#797979" />
      <van-icon v-else name="plus" />
      <span>关注</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showLoading = ref(false)
const props = defineProps({
  // 是否关注
  followed: {
    type: Boolean || String,
    required: true
  },
  // 歌手id
  id: Number,
})
// 点击关注
function followClick(id, status) {
  showLoading.value = true
  setTimeout(() => {
    showLoading.value = false
  }, 1000)
}
</script>

<style scoped lang="less">
.FollowButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 24px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    .FollowButton__followed {
      color: #fff;
      background-color: #797979;
    }

    .FollowButton__unfollowed {
      color: #fff;
      background-color: red;
    }
  }

  // 已关注
  .FollowButton__followed {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 4px;
    line-height: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    background: transparent;
    color: #797979;
    border: 1px solid #d1d1d1;
    border-radius: 25px;
    box-sizing: border-box;
  }

  // 未关注
  .FollowButton__unfollowed {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 4px;
    line-height: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    background: transparent;
    color: red;
    border: 1px solid red;
    border-radius: 25px;
    box-sizing: border-box;
  }
}
</style>