<template>
  <div class="artistListDetail">
    <!-- 顶部 -->
    <div class="header">
      <van-icon class="header__left" name="arrow-left" size='23' @click="$router.back()" />
      <div class="header__right">
        <span>{{ artistListDetail.artist.name }}</span>
        <van-icon name="ellipsis" size='23' />
      </div>
    </div>
    <!-- 背景图 -->
    <div class="background">
      <img v-lazy="artistListDetail.artist.cover + '?param=600y400)'" alt="">
    </div>
    <!-- tab标签页 -->
    <van-tabs v-model:active="active" swipeable class="vantTabs">
      <van-tab title="主页">
        <div class="home">
          {{ artistListDetail.artist.briefDesc }}
        </div>
      </van-tab>
      <van-tab title="歌曲">
        <div class="song">
          <!-- 播放全部 -->
          <PlayAllFunctionBar :songs="artistListDetail.songs" />
          <SongListItem v-for="(item, index) in artistListDetail.songs" :key="item.id" :config="item" :index="index" />
        </div>
        <!-- 分页加载更多 -->
        <van-pagination v-model="artistListDetail.songsParams.offset" mode="simple"
          :total-items="artistListDetail.artist.musicSize" :items-per-page="artistListDetail.songsParams.limit"
          @change="songPageChange" />
      </van-tab>
      <van-tab title="专辑">
        <div class="album">
          <AlbumListItem v-for="(item, index) in artistListDetail.albums" :key="item.id" :config="item" />
        </div>
        <!-- 分页加载更多 -->
        <van-pagination v-model="artistListDetail.albumsParams.offset" mode="simple"
          :total-items="artistListDetail.artist.albumSize" :items-per-page="artistListDetail.albumsParams.limit"
          @change="albumPageChange" />
      </van-tab>
      <van-tab title="MV">
        <div class="mv">
          <MvListItem v-for="(item, index) in artistListDetail.mvs" :key="item.id" :config="item" />
        </div>
        <!-- 分页加载更多 -->
        <van-pagination v-model="artistListDetail.mvsParams.offset" mode="simple"
          :total-items="artistListDetail.artist.mvSize" :items-per-page="artistListDetail.mvsParams.limit"
          @change="mvPageChange" />
      </van-tab>
    </van-tabs>
    <!-- 返回顶部 -->
    <van-back-top right="32px" bottom="76px" target=".artistListDetail" />
  </div>
</template>

<script setup>
import PlayAllFunctionBar from "@/components/PlayAllFunctionBar/index.vue"//播放全部组件
import MvListItem from "@/components/MvListItem/index.vue"// mv列表项
import AlbumListItem from '@/components/albumListItem/index.vue'// 专辑列表组件
import SongListItem from '@/components/SongListItem/index.vue'// 歌曲列表项组件
import { useArtistListDetailStore } from '@/stores/artistListDetail.js'
import { useRoute } from 'vue-router';
import { watch, ref, onMounted } from 'vue'

const active = ref(0)
const { artistListDetail, getArtistDetail, getArtistSongs, getArtistAlbum, getArtistMv } = useArtistListDetailStore()
const route = useRoute()

const init = async () => {
  await getArtistDetail(route.query.id)// 获取歌手详情
  await getArtistSongs(route.query.id)// 获取歌手歌曲
  await getArtistAlbum(route.query.id) // 获取歌手专辑
  await getArtistMv(route.query.id)// 获取歌手MV
}
await init()

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/artistListDetail') {
    init()// 重新获取数据
  }
});

// 歌曲分页加载更多
const songPageChange = async (page) => {
  artistListDetail.songsParams.offset = page
  await getArtistSongs(route.query.id)
}
// mv分页加载更多
const mvPageChange = async (page) => {
  artistListDetail.albumsParams.offset = page
  await getArtistMv(route.query.id)
}
// 专辑分页加载更多
const albumPageChange = async (page) => {
  artistListDetail.mvsParams.offset = page
  await getArtistAlbum(route.query.id)
}

// 监听滚动
onMounted(() => {
  // 监听的元素
  const artistListDetail = document.querySelector('.artistListDetail')
  // 滚动事件
  const scroll = () => {
    const scrollTop = artistListDetail.scrollTop
    const header = document.querySelector('.header')
    if (scrollTop > 0) {
      header.style.backdropFilter = `saturate(150%) contrast(100%) brightness(90%) blur(18px)`;// ${scrollTop / 10}动态模糊
    } else {
      header.style.backdropFilter = 'none'
    }
    // console.log(scrollTop)
  }
  artistListDetail.addEventListener('scroll', scroll)
})
</script>

<script>
export default { name: "artistListDetail" }
</script>

<style scoped lang="less">
:deep(.van-tabs) {
  z-index: 0;
  position: sticky;
  top: 246px;
}

:deep(.van-tabs__wrap) {
  z-index: 1;
  position: sticky;
  top: 46px;
}

:deep(.van-tabs__line) {
  bottom: 22px;
  width: 20px;
}

:deep(.van-pagination) {
  padding: 16px;
}

.artistListDetail {
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
    z-index: 2;

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
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      font-size: 0;
      display: block;
      object-fit: cover;
      transition: all 0.3s;
    }
  }

  .vantTabs {
    background-color: var(--van-search-background);
    color: var(--font-color-dark);

    .home {
      white-space: break-spaces;
      padding: 16px;
      box-sizing: border-box;
      font-size: 14px;
      min-height: 100vh;
    }

    .song {
      box-sizing: border-box;
    }

    .album {
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .mv {
      padding: 16px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
    }
  }

  .test {
    height: 500px;
    width: 100%;
  }
}
</style>