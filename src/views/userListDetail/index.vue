<template>
  <div class="userListDetail">
    <!-- 导航栏 -->
    <div class="header">
      <van-icon class="header__left" name="arrow-left" size='23' @click="$router.back()" />
      <div class="header__right">
        <span>{{ userListDetail.userDetail.profile.nickname }}</span>
        <van-icon name="ellipsis" size='23' />
      </div>
    </div>
    <!-- 背景图片 -->
    <div class="background">
      <img v-lazy="userListDetail.userDetail.profile.backgroundUrl + '?param=600y400)'" alt="">
    </div>
    <!-- 合为一体 -->
    <div style="margin-top: -100px;">
      <!-- 用户卡片 -->
      <div class="userinfoCard" style="opacity:1">
        <div class="card">
          <!-- 头像 -->
          <img class="avatar" v-lazy="userListDetail.userDetail.profile.avatarUrl + '?param=200y200'" alt="" />
          <img class="avatar__identify" v-if="userListDetail.userDetail.identify.imageUrl"
            v-lazy="userListDetail.userDetail.identify.imageUrl + '?param=20y20'" alt="">
          <!-- 昵称 -->
          <div class="nickname">{{ userListDetail.userDetail.profile.nickname }}</div>
          <!-- 身份 -->
          <div class="identify" v-if="userListDetail.userDetail.identify.imageDesc">
            <span>{{ userListDetail.userDetail.identify.imageDesc }}</span>
          </div>
          <!-- 关注，粉丝，等级 -->
          <div class="desc">
            <div class="desc__item">
              <span class="desc__item__value">{{ userListDetail.userDetail.profile.follows }}</span>
              <span class="desc__item__title">关注</span>
            </div>
            <div class="desc__line"></div>
            <div class="desc__item">
              <span class="desc__item__value">{{ userListDetail.userDetail.profile.followeds }}</span>
              <span class="desc__item__title">粉丝</span>
            </div>
            <div class="desc__line"></div>
            <div class="desc__item">
              <span class="desc__item__title">Lv.</span>
              <span class="desc__item__value">{{ userListDetail.userDetail.level }}</span>
            </div>
          </div>
          <!-- tags -->
          <div class="tags">
            <div class="tag">IP属地：{{ filterCityName(userListDetail.userDetail.profile.city) }}</div>
            <div class="tag">
              <GenderIcon :config="userListDetail.userDetail.profile.gender" :size="12" />
              {{ filterBirthday(userListDetail.userDetail.profile.birthday) }}
            </div>
            <div class="tag">用户ID：{{ userListDetail.userDetail.profile.userId }}</div>
            <div class="tag">
              <van-icon name="arrow" />
            </div>
          </div>
          <!-- 关注，私信 -->
          <div class="btns">
            <FollowButton :followed="userListDetail.userDetail.profile.followed"
              :id="userListDetail.userDetail.profile.userId" />
            <!-- 私信按钮 -->
            <div class="chat">
              <van-icon name="chat-o" size="16" />私信
            </div>
            <!-- 展开按钮 -->
            <div class="expand">
              <van-icon name="arrow-down" />
            </div>
          </div>
        </div>
      </div>
      <!-- tab切换栏 -->
      <van-tabs v-model:active="active" swipeable class="vantTabs" sticky>
        <van-tab title="主页">
          <div class="test"></div>
        </van-tab>
        <van-tab title="听歌排行">
          <div class="test"></div>
        </van-tab>
        <van-tab title="歌单">
          <div class="test"></div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import FollowButton from '@/components/FollowButton/index.vue'// 关注按钮
import GenderIcon from '@/components/GenderIcon/index.vue'// 性别图标
import { filterCityName, filterBirthday } from '@/utils/useFilter.js'
import { useUserListDetailStore } from '@/stores/userListDetail.js'
import { useRoute } from 'vue-router';
import { watch, ref, onMounted } from 'vue'

const { getUserListDetail, userListDetail } = useUserListDetailStore()
const route = useRoute()
const active = ref(0)

const init = async () => {
  await getUserListDetail(route.query.id)// 获取歌单详情
}
await init()

</script>

<style scoped lang="less">
:deep(.van-sticky--fixed) {
  background-color: var(--card-background-color) !important;
  top: 46px !important; // 顶部导航栏高度再减1px，解决缝隙问题
}

:deep(.van-tabs__line) {
  bottom: 22px;
  width: 20px;
}

:deep(.van-tabs__nav) {
  background: none
}

.userListDetail {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: relative;

  .header {
    height: 46px;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 16px;
    // 绝对定位
    position: fixed;
    top: 0;
    // 透明背景
    background: transparent;
    transition: all .3s;
    z-index: 10;

    .header__right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
  }

  .background {
    height: 300px;
    width: 100%;
    transition: all .3s; // 过渡动画
    position: sticky;
    top: calc(-300px + 46px);
    // z-index: 1;
    // margin-bottom: 60px;

    img {
      width: 100%;
      height: 100%;
      font-size: 0;
      display: block;
      object-fit: cover;
      transition: all 0.3s;
    }
  }

  .userinfoCard {
    height: auto;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    z-index: 2;
    // position: absolute;
    // top: 150px;

    .card {
      height: auto;
      width: 100%;
      background-color: var(--card-background-color);
      border-radius: 8px;
      box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 16px;
      box-sizing: border-box;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
      }

      .avatar__identify {
        position: absolute;
        top: 20px;
        left: calc(50% + 20px);
        height: 20px;
        width: 20px;
        border-radius: 50%;
      }

      .nickname {
        margin-top: 32px;
        font-size: 16px;
        font-weight: bold;
        color: var(--font-color-dark);
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
      }

      .identify {
        font-size: 14px;
        text-align: center;
      }

      .desc {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .desc__item {
          display: flex;
          align-items: center;
          gap: 4px;
          line-height: 1;
          font-size: 12px;
          color: #999;
        }

        .desc__line {
          height: 12px;
          width: 1px;
          background-color: #eee;
        }
      }

      .tags {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        overflow: hidden;

        .tag {
          height: 24px;
          border: var(--tag-border) solid #e5e5e5;
          border-radius: 4px;
          line-height: 1;
          padding: 4px 6px;
          color: var(--font-color-dark);
          background-color: var(--subCard-background-color);
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
      }

      .btns {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        justify-content: center;

        .expand {
          height: 24px;
          width: 24px;
          border: var(--tag-border) solid #e5e5e5;
          border-radius: 50%;
          color: var(--font-color-dark);
          background-color: var(--subCard-background-color);
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat {
          height: 24px;
          font-size: 12px;
          color: #797979;
          border: var(--tag-border) solid #e5e5e5;
          border-radius: 25px;
          line-height: 1;
          padding: 4px 10px;
          color: var(--font-color-dark);
          background-color: var(--subCard-background-color);
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
      }
    }
  }

  .vantTabs {
    .test {
      height: 1000px;
      // background-color: #5e3c0a;
    }
  }
}
</style>