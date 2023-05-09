<template>
  <div class="FollowButton">
    <!-- 已关注，取消关注 -->
    <div v-if="showFollow" class="FollowButton__followed" @click="followClick(id, 0)">
      <van-icon name="success" />
      <span>已关注</span>
    </div>
    <!-- 未关注，点击关注 -->
    <div v-else class="FollowButton__unfollowed" @click="followClick(id, 1)">
      <van-loading v-if="showLoading" size="12px" color="#797979" />
      <van-icon v-else name="plus" />
      <span>关注</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { follow } from '@/api/index.js'
import { showToast } from 'vant'// vant组件库,居中提示信息

const props = defineProps({
  // 是否关注
  followed: {
    type: Boolean,
    required: true
  },
  // 歌手id
  id: {
    type: Number,
    required: true
  },
})
const showFollow = ref(props.followed)// 是否关注
const showLoading = ref(false)// 是否显示加载中

// 点击关注，参数t： 1为关注,其他为取消关注 （必选参数）
async function followClick(id, t) {
  showLoading.value = true// 显示loading
  const res = await follow(id, t)
  console.log("关注/取关", res)
  // 接口请求成功
  if (res && res.code == 200) {
    showFollow.value = !showFollow.value
    showLoading.value = false// 隐藏loading
    // 判断是关注还是取消关注
    if (t == 1) {
      showToast({
        message: '关注成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      showToast({
        message: '取消关注成功',
        type: 'success',
        duration: 1000
      })
    }
  } else {
    showLoading.value = false// 隐藏loading
    showToast({ type: 'fail', message: '操作失败' })
  }
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