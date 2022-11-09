<template>
  <div class="songListDetail">
    <div :style="{ backgroundImage: 'url(' + songListDetail.playlist.coverImgUrl + '?param=10y10)' }"
      style="background-size: 100% 100%;background-repeat: no-repeat;">
      <div style="backdrop-filter: saturate(150%) contrast(100%) blur(150px);">

        <div class="songListDetail__header">
          <van-icon name="arrow-left" size='23' class="left" @click="$router.back()" />
          <div class="right">
            <span>歌单</span>
            <div class="right__right">
              <van-icon name="search" size='23' />
              <van-icon name="ellipsis" size='23' />
            </div>
          </div>
        </div>
        <div class="songListDetail__detail">
          <ImgCard :imgUrl="songListDetail.playlist.coverImgUrl" width="110px" height="110px" class="left" />
          <div class="right">
            <div class="name">{{ songListDetail.playlist.name }}</div>
            <div class="tags">
              <van-tag color="#ffffff4a" round v-for="item in songListDetail.playlist.tags">{{ item }}</van-tag>
            </div>
            <div class="creator">
              <img class="creator__avatarUrl" :src="songListDetail.playlist.creator.avatarUrl + '?param=20y20'" alt="">
              <div class="creator__nickname">{{ songListDetail.playlist.creator.nickname }}</div>
              <van-icon name="arrow" size="12" />
            </div>
            <div class="description">
              {{ songListDetail.playlist.description }}
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="songListDetail__content">
          <SubCard class="subCard" height="40px" />
          <div class="functionCard">
            <div class="left">
              <van-icon name="play-circle-o" size="25" color="red" />
              <span>播放全部</span>
              <span>(1)</span>
            </div>
            <div class="right">
              <van-icon name="music-o" size="20" />
              <van-icon name="down" size="20" />
              <van-icon name="wap-nav" size="20" />
            </div>
          </div>
          <div class="songList">
            <div class="songList__item" v-for="(item, index) in songListDetail.playlist.tracks">

              <span class="left">{{ index + 1 }}</span>

              <div class="center ">
                <div class="top">
                  <span>{{ item.name }}</span>
                  <div class="alia">
                    <span v-for="alia in item.alia">({{ alia }})</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="ar">
                    <span v-for="ar in item.ar">{{ ar.name }}</span>
                  </div>
                </div>
              </div>

              <div class="right">123</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ImgCard from '@/components/imgCard/index.vue'// 引入图片组件
import SubCard from './components/subCard.vue'// 引入收藏，评论，分享组件
import { useRoute } from 'vue-router';
import { useSongListDetailStore } from '@/stores/songListDetail.js';
import { watch } from 'vue'

const route = useRoute();
const { songListDetail, getPlaylistDetail } = useSongListDetailStore();

// 初始化执行一次
function init() {
  getPlaylistDetail(route.query.id);// 获取歌单详情
}
init()

// 监听路由id变化 
watch(() => route.query.id, (newId) => {
  // 判断是否在当前页面
  if (route.path === '/songListDetail') {
    getPlaylistDetail(newId);
  }
});
</script>

<style scoped lang="less">
// .songListDetail::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: url("https://i0.wp.com/airlinkalaska.com/wp-content/uploads//aurora-2.jpg?resize=1024%2C683&ssl=1");
//   background-size: cover;
//   // 核心代码：
//   filter: blur(50px);
//   transform: scale(3);
// }

:deep(.van-tag--round) {
  padding: 2px 10px;
  box-sizing: border-box;
  white-space: nowrap;
}

.songListDetail {
  height: auto;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;

  &__header {
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
    // 透明背景
    background: transparent;
    position: sticky;
    top: 0;
    z-index: 11;

    .right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      gap: 16px;

      &__right {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
  }

  &__detail {
    height: auto;
    width: 100%;
    padding: 32px 16px 48px 16px;
    box-sizing: border-box;
    display: flex;
    // 背景滤镜
    // backdrop-filter: saturate(150%) contrast(100%) blur(150px);


    .left {
      aspect-ratio: 1 / 1
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      gap: 8px;

      .description {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #ffffffb5;
        font-size: 12px;
      }

      .name {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
      }

      .tags {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .creator {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #ffffffb5;
        font-size: 12px;

        .creator__avatarUrl {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }

      .description {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  &__content {
    height: 200vh;
    position: relative;
    // backdrop-filter: saturate(150%) contrast(100%) blur(150px);
    padding-top: 32px;
    background-color: #fff;

    .subCard {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .functionCard {
      height: auto;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 16px;
      align-items: center;
      box-sizing: border-box;
      position: sticky;
      top: 46px;

      .left {
        display: flex;
        align-items: center;
        gap: 8px;

        span:nth-child(2) {
          font-size: 16px;
          font-weight: bold;
        }

        span:nth-child(3) {
          font-size: 14px;
          color: #848484;
        }
      }

      .right {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }

    .songList {
      display: flex;
      flex-direction: column;

      &__item {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        box-sizing: border-box;
        gap: 16px;

        .left {}

        .center {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;

          .top {
            display: flex;
            align-items: center;
          }
        }

        &:hover {
          background-color: red;
        }
      }
    }
  }
}
</style>