<template>
  <div class="UserListItem">
    <div class="UserListItem__left" @click="routerPush('/userListDetail', { id: config.userId })">
      <img class="UserListItem__left__avatar" v-lazy="config.avatarUrl + '?param=100y100'" />
      <img v-if="config.avatarDetail" class="UserListItem__left__avatarDetail"
        :src="config.avatarDetail.identityIconUrl" alt="">
    </div>
    <div class="UserListItem__center" @click="routerPush('/userListDetail', { id: config.userId })">
      <div class="UserListItem__center__name">
        <span>{{ config.nickname }}</span>
        <!-- 男 -->
        <svg v-if="config.gender == 1" t="1668774461542" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="10237" width="14" height="14">
          <path
            d="M744.727273 651.636364c0-205.661091-166.702545-372.363636-372.363637-372.363637S0 445.975273 0 651.636364s166.702545 372.363636 372.363636 372.363636 372.363636-166.702545 372.363637-372.363636zM93.090909 651.636364c0-154.228364 125.044364-279.272727 279.272727-279.272728s279.272727 125.044364 279.272728 279.272728-125.044364 279.272727-279.272728 279.272727S93.090909 805.864727 93.090909 651.636364z"
            fill="#75B9EB" p-id="10238"></path>
          <path
            d="M857.344 93.090909H698.181818a46.545455 46.545455 0 0 1 0-93.090909h279.272727a46.545455 46.545455 0 0 1 46.545455 46.545455v279.272727a46.545455 46.545455 0 0 1-93.090909 0V166.656L632.110545 465.454545 558.545455 391.889455 857.344 93.090909z"
            fill="#75B9EB" p-id="10239"></path>
        </svg>
        <!-- 女 -->
        <svg v-if="config.gender == 2" t="1668774602435" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="11317" width="14" height="14">
          <path
            d="M554.666667 680.021333V768h128a42.666667 42.666667 0 0 1 0 85.333333h-128v128a42.666667 42.666667 0 0 1-85.333334 0v-128h-128a42.666667 42.666667 0 0 1 0-85.333333h128v-87.978667C300.949333 659.029333 170.666667 515.413333 170.666667 341.333333 170.666667 152.810667 323.477333 0 512 0s341.333333 152.810667 341.333333 341.333333c0 174.08-130.282667 317.696-298.666666 338.688zM256 341.333333c0 141.376 114.624 256 256 256s256-114.624 256-256S653.376 85.333333 512 85.333333 256 199.957333 256 341.333333z"
            fill="#e8579a" p-id="11318"></path>
        </svg>
      </div>
      <div v-if="config.signature" class="UserListItem__center__desc">{{ config.signature }}</div>
    </div>
    <div class="UserListItem__right">
      <FollowButton :followed="config.followed" :id="config.userId" />
    </div>
  </div>
</template>

<script setup>
import FollowButton from "@/components/FollowButton/index.vue"// 关注按钮组件
import { useRouter } from "vue-router"

const router = useRouter()//路由
const props = defineProps({
  config: {
    userId: Number,//用户id
    avatarUrl: String,//用户头像
    nickname: String,//用户昵称
    gender: Number,//用户性别
    signature: String,//用户签名
    userType: Number,//用户类型,4：网易音乐人，10:官方认证，204:云音乐达人
    followed: Boolean,//是否关注
    avatarDetail: Object,//头像详情
  },
  keyword: String,// 搜索关键字
})

//跳转到用户详情页
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.UserListItem {
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  gap: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--song-list-hover);
  }

  .UserListItem__left {
    position: relative;
    width: 50px;
    height: 50px;

    .UserListItem__left__avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .UserListItem__left__avatarDetail {
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .UserListItem__center {
    flex: 1;
    overflow: hidden;

    .UserListItem__center__name {
      font-size: 16px;
      color: var(--font-color-5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span {
        margin-right: 10px;
      }
    }

    .UserListItem__center__desc {
      margin-top: 4px;
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>