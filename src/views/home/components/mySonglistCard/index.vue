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
            <div class="content__item" v-for="item in config.createPlaylist">
              <ImgCard class="content__item__img" :imgUrl="item.coverImgUrl" />
              <div class="content__item__info">
                <span>{{ item.name }}</span>
                <span>{{ item.trackCount }}首</span>
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
            <div class="content__item" v-for="item in config.collectPlaylist">
              <ImgCard class="content__item__img" :imgUrl="item.coverImgUrl" />
              <div class="content__item__info">
                <span>{{ item.name }}</span>
                <span>{{ item.trackCount }}首</span>
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
              <div class="helper__swiper__item" v-for="item in 4">
                <van-tag color="#ffe1e1" text-color="#ad0000">最近一年</van-tag>
                发布的
                <van-tag color="#ffe1e1" text-color="#bd0cc0">二次元</van-tag>
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
              <div class="helper__swiper__item" v-for="item in 4">
                <van-tag color="#ffe1e1" text-color="#ad0000">最近一年</van-tag>
                发布的
                <van-tag color="#ffe1e1" text-color="#bd0cc0">二次元</van-tag>
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
import { isLogin } from "@/hooks/index.js"

const active = ref(0)

const props = defineProps({
  config: Object,
})
</script>

<style scoped lang="less">
:deep(.van-sticky--fixed) {
  background-color: var(--card-background-color) !important;
  top: 46px !important;
  width: 100% !important;
  margin-left: -16px !important;
}

:deep(.van-tabs__nav) {
  background: none;
}

:deep(.van-swipe-item) {
  margin-top: 16px;
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
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    margin-top: 16px;
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
    gap: 8px;

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
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .helper__swiper__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
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