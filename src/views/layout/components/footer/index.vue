<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/discover" :icon="active == 0 ? icon1 : icon">发现</van-tabbar-item>
      <van-tabbar-item to="/home" :icon="active == 1 ? icon3 : icon2">我的</van-tabbar-item>
      <van-tabbar-item to="/follow" :icon="active == 2 ? icon4 : icon5">关注</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import icon from "@/assets/icons/c3w_3b.png"//黑色
import icon1 from "@/assets/icons/c3w.png"//白色
import icon2 from "@/assets/icons/c3u_3b.png"//黑色
import icon3 from "@/assets/icons/c3u.png"//白色
import icon4 from "@/assets/icons/user.png"//白色
import icon5 from "@/assets/icons/user3.png"//黑色

const route = useRoute()
const active = ref(0)// 默认选中发现页

if (route.path == "/discover") {
  active.value = 0
} else if (route.path == "/home") {
  active.value = 1
} else if (route.path == "/follow") {
  active.value = 2
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item--active) {
  .van-tabbar-item__icon .van-icon {
    //红白渐变色，从左下到右上
    background: linear-gradient(45deg, #E60026 0%, #ff5555 50%, #ffffff 100%);
    border-radius: 50%;
  }

  .van-tabbar-item__icon img {
    transform: scale(0.8);
  }

  .van-icon-friends-o:before {
    transform: scale(0.8);
  }
}
</style>