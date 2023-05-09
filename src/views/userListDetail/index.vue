<template>
  <div class="userListDetail">
    <!-- 导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" size='23' @click="$router.back()" />
      <div class="title">
        <img class="title__avatar" v-lazy="userListDetail.userDetail.profile.avatarUrl + '?param=40y40'" alt="" />
        <span>{{ userListDetail.userDetail.profile.nickname }}</span>
      </div>
      <van-icon name="ellipsis" size='23' />
    </div>
    <!-- 背景图片 -->
    <div class="background">
      <img v-lazy="userListDetail.userDetail.profile.backgroundUrl + '?param=600y400)'" alt="">
    </div>
    <!-- 用户卡片 -->
    <div class="userinfoCard" style="opacity:1;margin-top: -100px;">
      <div class="card">
        <!-- 头像 -->
        <img class="avatar" v-lazy="userListDetail.userDetail.profile.avatarUrl + '?param=200y200'" alt="" />
        <!-- 身份徽标 -->
        <img class="avatar__identify" v-if="userListDetail.userDetail.identify"
          :src="userListDetail.userDetail.identify.imageUrl + '?param=20y20'" alt="">
        <!-- 昵称 -->
        <div class="nickname">{{ userListDetail.userDetail.profile.nickname }}</div>
        <!-- 身份 -->
        <div class="identify" v-if="userListDetail.userDetail.identify">
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
          <div class="tag">👣IP属地：{{ filterCityName(userListDetail.userDetail.profile.city) }}</div>
          <div class="tag">🌞村龄：{{ userListDetail.userDetail.createDays }}天</div>
          <div class="tag">
            <GenderIcon :config="userListDetail.userDetail.profile.gender" :size="12" />
            {{ filterBirthday(userListDetail.userDetail.profile.birthday) }}
          </div>
          <!-- 更多详情 -->
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
        </div>
      </div>
    </div>
    <!-- 更多信息 -->
    <div class="moreCard">
      <div class="card">
        <div class="signature">{{ userListDetail.userDetail.profile.signature }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FollowButton from '@/components/FollowButton/index.vue'// 关注按钮
import GenderIcon from '@/components/GenderIcon/index.vue'// 性别图标
import { filterCityName, filterBirthday } from '@/utils/useFilter.js'
import { useUserListDetailStore } from '@/stores/userListDetail.js'
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'

const { getUserListDetail, userListDetail } = useUserListDetailStore()
const route = useRoute()
const init = async () => {
  await getUserListDetail(route.query.id)// 获取歌单详情
}
await init()



// 监听滚动
onMounted(() => {
  // 监听的元素
  const userListDetail = document.querySelector('.userListDetail')
  // 滚动事件
  const scroll = () => {
    const scrollTop = userListDetail.scrollTop
    const header = document.querySelector('.header')
    const title = document.querySelector('.title')//居中用户名和头像
    const background = document.querySelector('.background')
    const card = document.querySelector('.userinfoCard')
    if (scrollTop > 0) {
      header.style.background = `rgb(255 255 255 / ${scrollTop}%)`;// 透明度
      header.style.color = '#000';// 字体颜色
      // background.style.filter = `saturate(150%) contrast(100%) brightness(90%) blur(${scrollTop / 10}px)`
      card.style.opacity = 1 - scrollTop / card.offsetHeight
      title.style.opacity = scrollTop / card.offsetHeight
    } else {
      header.style.background = `rgb(255 255 255 / ${0}%)`;// 透明度
      header.style.color = '#fff';// 字体颜色
      // background.style.filter = 'blur(0px)'
      card.style.opacity = 1
      title.style.opacity = 0
    }
    // console.log(scrollTop)
  }
  userListDetail.addEventListener('scroll', scroll)
})
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
    justify-content: space-between;
    gap: 16px;
    // 绝对定位
    position: fixed;
    top: 0;
    // 透明背景
    background: transparent;
    transition: all .3s;
    z-index: 10;

    .title {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
      gap: 8px;
      line-height: 1;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      opacity: 0;

      .title__avatar {
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }
    }
  }

  .background {
    height: 300px;
    width: 100%;
    transition: all .3s; // 过渡动画
    position: sticky;
    // top: 0;
    top: calc(-300px + 46px);

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
      transition: all .5s; // 过渡动画(展开显示更多详情或者相似推荐)

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
      }

      .nickname {
        margin-top: 32px;
        font-size: 18px;
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
        color: var(--font-color-dark)
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

  .moreCard {
    height: auto;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    z-index: 2;

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
    }
  }
}
</style>