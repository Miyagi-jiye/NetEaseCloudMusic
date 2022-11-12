<template>
  <!-- 接受到数据，并且已经登录 -->
  <div class="mySonglistCard" v-if="config && isLogin">
    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab title="创建歌单">
        <!-- one -->
        <div class="mySonglistCard__one">
          <div class="header">
            <span class="header__title">创建歌单({{ config.createPlaylist.length }})个</span>
            <div class="header__setting">
              <van-icon name="plus" />
              <van-icon name="ellipsis" />
            </div>
          </div>
          <div class="content">
            <div class="content__item" v-for="item in config.createPlaylist"
              @click="routerPush('/songListDetail', { id: item.id })">
              <ImgCard class="content__item__img" :imgUrl="item.coverImgUrl" />
              <div class="content__item__info">
                <span class="nowrap">{{ item.name }}</span>
                <span class="nowrap">{{ item.trackCount }}首</span>
              </div>
              <div class="content__item__setting">
                <van-icon name="ellipsis" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏歌单">
        <!-- two -->
        <div class="mySonglistCard__two">
          <div class="header">
            <span class="header__title">收藏歌单({{ config.collectPlaylist.length }})个</span>
            <div class="header__setting">
              <van-icon name="ellipsis" />
            </div>
          </div>
          <div class="content">
            <div class="content__item" v-for="item in config.collectPlaylist"
              @click="routerPush('/songListDetail', { id: item.id })">
              <ImgCard class="content__item__img" :imgUrl="item.coverImgUrl" />
              <div class="content__item__info">
                <span class="nowrap">{{ item.name }}</span>
                <span class="nowrap">{{ item.trackCount }}首</span>
              </div>
              <div class="content__item__setting">
                <van-icon name="ellipsis" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="歌单助手">
        <!-- three -->
        <div class="mySonglistCard__three">
          <div class="header">
            <span class="header__title">歌单助手</span>
          </div>
          <div class="helper">
            <div class="helper__title">你可以从歌单中筛选出</div>
            <div class="helper__swiper">
              <div class="helper__swiper__item" v-for="item in 5" :style="{ '--delay': item - 2 }">
                <div v-if="item == 1">
                  <van-tag :type="tagType[item - 1]">最近收藏</van-tag>
                  的
                  <van-tag :type="tagType[item - 2]">二次元</van-tag>
                </div>
                <div v-if="item == 2">
                  <van-tag :type="tagType[item - 1]">80年代</van-tag>
                  <van-tag :type="tagType[item - 2]">华语</van-tag>
                  老歌
                </div>
                <div v-if="item == 3">
                  <van-tag :type="tagType[item - 1]">最近一年收藏</van-tag>
                  的
                  <van-tag :type="tagType[item - 2]">日语</van-tag>
                </div>
                <div v-if="item == 4">
                  适合
                  <van-tag :type="tagType[item - 1]">夜晚</van-tag>
                  听的
                  <van-tag :type="tagType[item - 2]">日语</van-tag>
                </div>
                <div v-if="item == 5">
                  <van-tag :type="tagType[item - 1]">最近一年</van-tag>
                  发布的
                  <van-tag :type="tagType[item - 2]">二次元</van-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footer__button">试试看</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
  <!-- 没接受到数据 -->
  <div class="mySonglistCard" v-else>
    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab title="创建歌单">
        <!-- one -->
        <div class="mySonglistCard__one">
          <div class="header">
            <span class="header__title">创建歌单</span>
            <div class="header__setting">
              <van-icon name="plus" />
              <van-icon name="ellipsis" />
            </div>
          </div>
          <div class="content">
            <div class="content__noLogin">
              <div class="img">
                <van-icon name="plus" size="2rem" color="var(--font-color-5)" />
              </div>
              <span>一键导入外部音乐</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏歌单">
        <!-- two -->
        <div class="mySonglistCard__two">
          <div class="header">
            <span class="header__title">收藏歌单</span>
            <div class="header__setting">
              <van-icon name="ellipsis" />
            </div>
          </div>
          <div class="content">
            <div class="content__noLogin">
              <span>暂无收藏的歌单</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="歌单助手">
        <!-- three -->
        <div class="mySonglistCard__three">
          <div class="header">
            <span class="header__title">歌单助手</span>
          </div>
          <div class="helper">
            <div class="helper__title">你可以从歌单中筛选出</div>
            <div class="helper__swiper">
              <div class="helper__swiper__item" v-for="item in 5" :style="{ '--delay': item - 2 }">
                <div v-if="item == 1">
                  <van-tag :type="tagType[item - 1]" size="medium">最近收藏</van-tag>
                  的
                  <van-tag :type="tagType[item - 2]" size="medium">二次元</van-tag>
                </div>
                <div v-if="item == 2">
                  <van-tag :type="tagType[item - 1]" size="medium">80年代</van-tag>
                  <van-tag :type="tagType[item - 2]" size="medium">华语</van-tag>
                  老歌
                </div>
                <div v-if="item == 3">
                  <van-tag :type="tagType[item - 1]" size="medium">最近一年收藏</van-tag>
                  的
                  <van-tag :type="tagType[item - 2]" size="medium">日语</van-tag>
                </div>
                <div v-if="item == 4">
                  适合
                  <van-tag :type="tagType[item - 1]" size="medium">夜晚</van-tag>
                  听的
                  <van-tag :type="tagType[item - 2]" size="medium">日语</van-tag>
                </div>
                <div v-if="item == 5">
                  <van-tag :type="tagType[item - 1]" size="medium">最近一年</van-tag>
                  发布的
                  <van-tag :type="tagType[item - 2]" size="medium">二次元</van-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footer__button">试试看</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import ImgCard from "@/components/ImgCard/index.vue";
import { ref } from 'vue'
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'
import { useRouter } from "vue-router";

const tagType = ['primary', 'success', 'danger', 'warning']// 定义歌单助手tag随机类型
const { isLogin } = storeToRefs(useLoginStore())//登录状态
const active = ref(0)//tab切换
const router = useRouter()//路由
const props = defineProps({
  config: Object,
})


//跳转到歌单详情
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
:deep(.van-sticky--fixed) {
  background-color: var(--card-background-color) !important;
  top: 45px !important; // 顶部导航栏高度再减1px，解决缝隙问题
  width: 100% !important;
  margin-left: -16px !important;
}

:deep(.van-tabs__nav) {
  background: none;
}

:deep(.van-swipe-item) {
  margin-top: 16px;
}

:deep(.van-tag) {
  margin: 0 4px;
}

.mySonglistCard {
  width: 100%;
  height: auto;

  // 第一个tab，创建歌单
  &__one,
  &__two,
  &__three {
    width: 100%;
    height: auto;
    background-color: var(--card-background-color);
    padding: 16px;
    box-sizing: border-box;
    margin-top: 16px;
    border-radius: 12px;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    &__title {
      font-size: 12px;
      color: var(--font-color-4);
    }

    &__setting {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &__img {
        margin-right: 16px;
      }

      &__info {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 8px;
        overflow: hidden;

        span:nth-child(1) {
          font-size: 14px;
          color: var(--font-color-dark);
        }

        span:nth-child(2) {
          font-size: 12px;
          color: var(--font-color-4);
        }
      }

      &__setting {
        margin-left: 16px;
      }
    }
  }

  .helper {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: var(--font-color-4);
    opacity: .8;

    &__title {
      margin-bottom: 16px;
    }

    &__swiper {
      width: 100%;
      // height: 100%;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      overflow: hidden;
      position: relative;
      line-height: 2.4;

      &__item {
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        opacity: 0;
        animation: animate 10s linear infinite;
        animation-delay: calc(2s * var(--delay));
      }

      &__item:last-child {
        animation-delay: calc(2s * var(--delay));
      }

      @keyframes animate {
        0% {
          opacity: 0;
          transform: translateY(100%) scale(0.5);
        }

        5%,
        20% {
          opacity: 0.4;
          transform: translateY(100%) scale(0.7);
        }

        25%,
        40% {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0%) scale(1);
        }

        45%,
        60% {
          opacity: 0.4;
          transform: translateY(-100%) scale(0.7);
        }

        65%,
        100% {
          opacity: 0;
          transform: translateY(-100%) scale(0.5);
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;

    &__button {
      width: auto;
      height: auto;
      background: #ff002a;
      color: #fff;
      border-radius: 20px;
      font-size: 14px;
      padding: 4px 24px;
      cursor: pointer;

      &:active {
        background: #e40026;
      }
    }
  }

  &__two {
    .content {
      &__noLogin {
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;
        font-size: 14px;
        color: var(--font-color-4);
        height: 60px;
      }
    }
  }

  &__one {
    .content {
      &__noLogin {
        display: flex;
        align-items: center;
        gap: 16px;

        .img {
          width: 64px;
          height: 64px;
          background: #ababab;
          border-radius: 8px;
          // 居中对齐
          display: flex;
          align-items: center;
          justify-content: center;
        }

        span {
          flex: 1;
          font-size: 14px;
          color: var(--font-color-dark);
        }
      }
    }
  }
}
</style>