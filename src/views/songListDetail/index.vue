<template>
  <LoadingPage v-if="loading" />
  <div class="songListDetail" v-else>
    <div class="background"
      :style="{ backgroundImage: 'url(' + songListDetail.playlist.coverImgUrl + '?param=10y10)' }">
      <div class="filter">
        <div class="songListDetail__header" ref="header">
          <van-icon name="arrow-left" size='23' class="left" @click="$router.back()" />
          <div class="right">
            <span>歌单</span>
            <div class="right__right">
              <van-icon name="search" size='23' />
              <van-icon name="ellipsis" size='23' />
            </div>
          </div>
        </div>
        <div class="songListDetail__detail" ref="detail">
          <ImgCard class="left" :imgUrl="songListDetail.playlist.coverImgUrl" width="110px" height="110px" />
          <div class="right nowrap">
            <div class="name nowrap">{{ songListDetail.playlist.name }}</div>
            <div class="tags" v-if="songListDetail.playlist.tags">
              <van-tag color="#ffffff4a" round v-for="item in songListDetail.playlist.tags">
                {{ item }}
              </van-tag>
            </div>
            <div class="creator">
              <img class="creator__avatarUrl" v-lazy="songListDetail.playlist.creator.avatarUrl + '?param=20y20'"
                alt="创建者">
              <div class="creator__nickname">{{ songListDetail.playlist.creator.nickname }}</div>
              <van-icon name="arrow" size="12" />
            </div>
            <div>
              <Description class="description" :desc="songListDetail.playlist.description"
                v-if="songListDetail.playlist.description" :end="50" />
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
                  {{ item.name }}<span v-for="alia in item.alia">({{ alia }})</span>
                </div>
                <div class="bottom">
                  <Tags :config="item" style="margin-right: 4px;float: left;" />
                  <span v-for="ar in item.ar">{{ ar.name }}</span>
                  - {{ item.al.name }}
                </div>
              </div>

              <div class="right">
                <svg v-if="item.mv" t="1668065190182" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="15909" width="24" height="24">
                  <path
                    d="M505.173333 384.426667c-32.426667-24.32-78.506667-1.706667-78.506666 38.826666v177.493334c0 40.533333 46.08 63.573333 78.506666 38.826666l116.48-88.746666c25.6-19.626667 25.6-58.453333 0-77.653334l-116.48-88.746666z m260.693334-203.093334c-168.533333-14.08-339.2-14.08-507.733334 0C135.253333 192 42.666667 288 42.666667 405.333333v213.333334c0 117.333333 92.586667 213.333333 215.466666 224 84.053333 7.253333 168.96 10.666667 253.866667 10.666666s169.813333-3.413333 253.866667-10.666666c122.88-10.666667 215.466667-106.666667 215.466666-224v-213.333334c0-117.333333-92.586667-213.333333-215.466666-224zM896 618.666667c0 72.533333-58.88 132.266667-137.386667 138.666666-163.413333 14.08-329.386667 14.08-493.226666 0C186.88 750.933333 128 691.2 128 618.666667v-213.333334c0-72.533333 58.88-132.266667 137.386667-138.666666C347.306667 259.413333 429.653333 256 512 256s164.693333 3.413333 246.613333 10.666667C837.12 273.066667 896 332.8 896 405.333333v213.333334z"
                    p-id="15910" fill="#b4b4b4"></path>
                </svg>
                <van-icon name="ellipsis" size='20' color="#b4b4b4" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoadingPage from '@/components/LoadingPage/index.vue'// 加载中
import Description from './components/description.vue'// 描述组件
import ImgCard from '@/components/imgCard/index.vue'// 引入图片组件
import SubCard from './components/subCard.vue'// 引入收藏，评论，分享组件
import Tags from '@/components/tags/index.vue'// 引入标签组件
import { useRoute } from 'vue-router';
import { useSongListDetailStore } from '@/stores/songListDetail.js';
import { ref, watch, onMounted, onUnmounted } from 'vue'

const route = useRoute();
const loading = ref(true);
const { songListDetail, getPlaylistDetail } = useSongListDetailStore();
const header = ref(null)
let main = null


// 初始化执行一次,等待数据返回
await getPlaylistDetail(route.query.id);// 获取歌单详情

// 监听路由id变化 
watch(() => route.query.id, (newId) => {
  // 判断是否在当前页面
  if (route.path === '/songListDetail') getPlaylistDetail(newId);
});

onMounted(() => {
  loading.value = false;

  // main = document.querySelector('.main')
  // main.addEventListener('scroll', (e) => {
  //   // console.log("距离顶部", e.target.scrollTop)
  //   // 改变 header 的背景颜色透明度
  //   if (e.target.scrollTop > 0) {
  //     header.value.style.background = `rgba(0 0 0 / ${e.target.scrollTop / 1}%)`
  //   } else {
  //     header.value.style.background = 'transparent'
  //   }
  // })
})
onUnmounted(() => {
  loading.value = true;
})
</script>

<style scoped lang="less">
:deep(.van-tag--round) {
  padding: 2px 10px;
  box-sizing: border-box;
  white-space: nowrap;
}

.songListDetail {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;

  .background {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }

  .filter {
    backdrop-filter: saturate(150%) contrast(100%) blur(150px);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

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
    // position: sticky;
    // top: 0;
    z-index: 11;
    transition: all .3s;

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
    }
  }

  &__content {
    height: 100%;
    min-height: 100vh;
    position: relative;
    padding-top: 32px;
    background-color: var(--card-background-color);
    flex: 1;

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
      // top: 46px;
      top: 0;
      color: var(--song-list-color);
      background-color: var(--card-background-color);
      z-index: 1;

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
          color: #999999;
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
        gap: 8px;
        cursor: pointer;

        &:hover {
          background-color: var(--song-list-hover);
        }

        .left {
          height: 25px;
          width: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999999;
        }

        .center {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 4px;
          overflow: hidden;

          .top,
          .bottom {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .top {
            font-size: 14px;
            color: var(--song-list-color);

            span {
              color: #999999;
              margin-left: 4px;
            }
          }

          .bottom {
            font-size: 14px;
            color: #999999;
            // flex布局文本溢出省略号会失效
            // display: flex;
            // align-items: center;

            span:not(:last-child)::after {
              content: "/";
              margin: 0 4px;
            }

            span:last-child {
              margin-right: 4px;
            }
          }
        }

        .right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    }
  }
}
</style>