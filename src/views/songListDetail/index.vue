<template>
  <div class="songListDetail">
    <div class="background"
      :style="{ backgroundImage: 'url(' + songListDetail.playlist.coverImgUrl + '?param=10y10)' }">
      <div class="filter">
        <div class="songListDetail__header" ref="header">
          <van-icon name="arrow-left" size='23' class="left" @click="router.back()" />
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
                v-if="songListDetail.playlist.description" :end="24" />
            </div>
          </div>
        </div>
        <div class="songListDetail__content">
          <SubCard class="subCard" height="40px" />
          <!-- 操作栏（可抽离） -->
          <div class="functionCard">
            <div class="left">
              <van-icon name="play-circle-o" size="25" color="red"
                @click="addAllToPlayList(songListDetail.playlist.tracks)" />
              <span>播放全部</span>
              <span>({{ songListDetail.playlist.tracks.length }})</span>
            </div>
            <div class="right">
              <van-icon name="music-o" size="20" />
              <van-icon name="down" size="20" />
              <van-icon name="wap-nav" size="20" />
            </div>
          </div>
          <!-- 歌曲列表（可采取虚拟化列表） -->
          <div class="songList">
            <SongListItem v-for="(item, index) in songListDetail.playlist.tracks" :config="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SongListDetailSkeleton from "@/views/layout/components/main/skeleton/songListDetail.vue"// 歌单详情页骨架屏
import SongListItem from "@/components/SongListItem/index.vue"// 歌曲列表项
import LoadingPage from '@/components/LoadingPage/index.vue'// 加载中 
import Description from './components/description.vue'// 描述组件
import ImgCard from '@/components/imgCard/index.vue'// 引入图片组件
import SubCard from './components/subCard.vue'// 引入收藏，评论，分享组件
import { useRoute, useRouter } from 'vue-router'
import { useSongListDetailStore } from '@/stores/songListDetail.js'
import { useAudioStore } from "@/stores/Audio.js"
import { watch, defineAsyncComponent } from 'vue'

// const SongListItem = defineAsyncComponent(() => import('@/components/SongListItem/index.vue'))// 异步组件歌曲列表项
const route = useRoute();
const router = useRouter();
const { addAllToPlayList } = useAudioStore();
const { songListDetail, getPlaylistDetail } = useSongListDetailStore();

// 初始化执行一次,等待数据返回
await getPlaylistDetail(route.query.id);// 获取歌单详情

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/songListDetail') getPlaylistDetail(newId);
});
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
    transition: all .3s; // 过渡动画
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
    }
  }
}
</style>