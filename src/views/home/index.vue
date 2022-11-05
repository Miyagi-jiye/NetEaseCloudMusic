<template>
  <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
    <div class="home">
      <UserInfoCard :config="userData.detail" />
      <FunctionCard />
      <MyLikeMusicCard :config="userData.playlist" />
      <MySonglistCard :config="userData.playlist" />
    </div>
  </van-pull-refresh>
</template>

<script setup>
import MySonglistCard from './components/mySonglistCard/index.vue'
import MyLikeMusicCard from './components/myLikeMusicCard/index.vue'
import UserInfoCard from "./components/userInfoCard/index.vue"
import FunctionCard from "./components/functionCard/index.vue"
import { ref } from 'vue'
import { useUserStore } from "@/stores/user.js"
import { storeToRefs } from "pinia"
import { isLogin } from "@/hooks/index.js"

const isLoading = ref(false)
const {
  userData,
  getUserDetail,
  getUserSubcount,
  getUserAccount,
  getUserPlaylist
} = useUserStore()

// 下拉刷新
function onRefresh() {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

async function init() {
  await getUserAccount()//用cookie先拿到用户id
  await getUserDetail()//再获取用户详情
  await getUserSubcount()//用户收藏
  await getUserPlaylist()//用户歌单
  console.log(userData)
}

// 如果是登录状态就获取用户信息
if (isLogin.value === true) {
  init()
}
</script>

<style scoped lang="less">
.home {
  height: auto;
  width: 100%;
  background: var(--van-search-content-background);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>