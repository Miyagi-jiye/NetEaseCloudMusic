<template>
  <div class="recommend">
    <!-- 导航栏 -->
    <!-- :style="{ background: 'url(' + recommendData.recommendDailySongs[0].al.picUrl + ')' }" -->
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

<script>
export default { name: 'recommend' }
</script>

<style scoped lang="less">
.recommend {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
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

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  // 定位
  position: sticky;
  top: 0;
  // color: var(--song-list-color);
  // background: var(--card-background-color);
  color: #fff;
  background: linear-gradient(135deg,
      hsl(170deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(250deg, 80%, 70%),
      hsl(320deg, 80%, 70%));
  background-size: 200% 200%; // 背景大小，这里是两倍，也就是背景图的宽高都是原来的两倍
  animation: gradient-move 10s ease alternate infinite;

  @keyframes gradient-move {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 100% 100%;
    }
  }

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