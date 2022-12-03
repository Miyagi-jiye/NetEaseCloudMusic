<template>
  <div class="recommend">
    <!-- 导航栏 -->
    <div class="header">
      <van-icon name="arrow-left" size='23' @click="$router.back()" />
      <div class="center">
        <div class="switch">
          <div class="recommendDailySongs" @click="(show = true)" :class="(show == true ? 'active' : '')">歌曲推荐</div>
          <div class="recommendSongList" @click="(show = false)" :class="(show == false ? 'active' : '')">歌单推荐</div>
        </div>
      </div>
      <van-icon name="ellipsis" size='23' />
    </div>
    <!-- 背景图片 -->
    <!-- <div class="background"></div> -->
    <!-- 推荐歌曲 -->
    <div class="songs" v-show="show == true">
      <PlayAllFunctionBar :songs="recommendData.recommendDailySongs" style="top: 46px" />
      <SongListItem v-for="(item, index) in recommendData.recommendDailySongs" :key="item.id" :config="item"
        :index="index" />
    </div>
    <!-- 推荐歌单 -->
    <div class="songList" v-show="show == false">
      <PlayListItem v-for="(item, index) in recommendData.recommendSongList" :key="item.id" :config="item" />
    </div>
  </div>
</template>

<script setup>
import PlayListItem from '@/components/PlayListItem/index.vue'// 歌单列表
import PlayAllFunctionBar from "@/components/PlayAllFunctionBar/index.vue"//播放全部组件
import SongListItem from '@/components/SongListItem/index.vue'// 歌曲列表项组件
import { useRecommendStore } from '@/stores/recommend.js'
import { ref } from 'vue'

const show = ref(true)// 切换推荐歌曲和推荐歌单
const { getRecommendSongs, getRecommendSongList, recommendData } = useRecommendStore()

await getRecommendSongs()
await getRecommendSongList()
</script>

<style scoped lang="less">
.recommend {
  background-color: #000;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

.background {
  height: 300px;
  width: 100%;
  transition: all .3s; // 过渡动画
  position: sticky;
  top: calc(-300px + 46px);
  z-index: 9;
  overflow: hidden;
  background: linear-gradient(to right, #4e54c8, #8f94fb);
}

.songs {
  background-color: var(--card-background-color);
}

.songList {
  background-color: var(--card-background-color);
}

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
  // 定位
  position: sticky;
  top: 0;
  // 透明背景
  // background: transparent;
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  transition: all .3s;
  z-index: 10;

  .center {
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
    opacity: 1;

    .switch {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #0000003d;
      border-radius: 20px;
      padding: 2px;
      box-sizing: border-box;

      .active {
        background-color: #fff;
        color: #000;
      }

      .recommendDailySongs {
        cursor: pointer;
        border-radius: 20px;
        padding: 6px 16px;
        box-sizing: border-box;
      }

      .recommendSongList {
        cursor: pointer;
        border-radius: 20px;
        padding: 6px 16px;
        box-sizing: border-box;
      }
    }
  }
}
</style>