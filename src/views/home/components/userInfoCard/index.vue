<template>
  <!-- 接受到数据并且已经登录 -->
  <div class="userInfoCard" v-if="config && isLogin">
    <div class="userInfoCard__avatar" @click="routerPush('/userListDetail', { id: config.profile.userId })">
      <img v-lazy="config.profile.avatarUrl + '?param=200y200'" alt="avatar" />
    </div>
    <div class="userInfoCard__info nowrap">
      <div class="userInfoCard__info__name">
        {{ config.profile.nickname }}
      </div>
      <div style="display:flex;align-items:center;color:var(--font-color-4);font-size: 14px;">
        <span class="userInfoCard__info__follows">{{ config.profile.follows }} 关注</span>
        <span class="my-line"></span>
        <span class="userInfoCard__info__followeds">{{ config.profile.followeds }} 粉丝</span>
        <span class="my-line"></span>
        <span class="userInfoCard__info__level">Lv.{{ config.level }}</span>
      </div>
    </div>
  </div>
  <!-- 没有接收到数据 -->
  <div class="userInfoCard" v-else>
    <div class="userInfoCard__avatar">
      <img :src="DefaultImg" alt="avatar" />
    </div>
    <div class="userInfoCard__info nowrap">
      <div class="userInfoCard__info__name" @click="$router.push('/login')">
        立即登录
        <van-icon name="arrow" />
      </div>
      <div style="display:flex;align-items:center;color:var(--font-color-4);font-size: 14px;">
        <span class="userInfoCard__info__follows">关注</span>
        <span class="my-line"></span>
        <span class="userInfoCard__info__followeds">粉丝</span>
        <span class="my-line"></span>
        <span class="userInfoCard__info__level">等级</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import DefaultImg from "@/assets/icons/fbs.png"// 默认头像
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'
import { useRouter } from "vue-router"

const router = useRouter()//路由
const { isLogin } = storeToRefs(useLoginStore())//登录状态

const props = defineProps({
  config: Object,
})

//跳转到用户详情页
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.userInfoCard {
  height: auto;
  width: 100%;
  background-color: var(--card-background-color);
  margin-top: 50px;
  position: relative;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;

  &__avatar {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    overflow: hidden;

    img {
      height: 60px;
      width: 60px;
      display: block; // 解决图片填不满的问题
      border-radius: 50%;
    }
  }

  &__info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 38px 16px 16px 16px;
    box-sizing: border-box;
    overflow: hidden;

    .my-line {
      margin: 0 8vw;
    }

    &__name {
      color: var(--text-color);
      font-size: 18px;
      font-weight: bold;
      color: var(--font-color-dark);
      cursor: pointer;
    }
  }
}
</style>