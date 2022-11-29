<template>
  <div class="home nowrap">
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
import { watch } from "vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/user.js"
import { useLoginStore } from '@/stores/login.js'


const { isLogin } = storeToRefs(useLoginStore())//登录状态
const { userData, getUserDetail, getUserSubcount, getUserAccount, getUserPlaylist } = useUserStore()


async function init() {
  await getUserAccount()//用cookie先拿到用户id
  await getUserDetail()//再获取用户详情
  await getUserSubcount()//用户收藏
  await getUserPlaylist()//用户歌单
  // console.log(userData)
}

// 判断是否登录
if (isLogin.value) init()

// 监听登录状态(测试用)
watch(isLogin, (val) => {
  if (val) init()
})
</script>

<script>
export default { name: "home" }
</script>

<style scoped lang="less">
.home {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background: var(--van-search-content-background);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>