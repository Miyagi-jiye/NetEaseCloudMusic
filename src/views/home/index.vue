<template>
  <div class="home">
    <UserInfoCard :config="userData.detail" />
    <FunctionCard />
    <MyLikeMusicCard :config="userData.playlist" />
    <MySonglistCard :config="userData.playlist" />
  </div>
</template>

<script setup>
import MySonglistCard from './components/mySonglistCard/index.vue'
import MyLikeMusicCard from './components/myLikeMusicCard/index.vue'
import UserInfoCard from "./components/userInfoCard/index.vue"
import FunctionCard from "./components/functionCard/index.vue"
import { useUserStore } from "@/stores/user.js"
import { storeToRefs } from "pinia"
import { watch } from 'vue'
import { isLogin } from "@/hooks/index.js"//判断是否登录

const {
  userData,
  getUserDetail,
  getUserSubcount,
  getUserAccount,
  getUserPlaylist
} = useUserStore()

async function init() {
  await getUserAccount()//用cookie先拿到用户id
  await getUserDetail()//再获取用户详情
  await getUserSubcount()//用户收藏
  await getUserPlaylist()//用户歌单
  console.log(userData)
}

// 判断是否登录
if (isLogin.value) init()

// 持续监听当前页面登录状态
watch(isLogin, (val) => {
  if (val) init()
})

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