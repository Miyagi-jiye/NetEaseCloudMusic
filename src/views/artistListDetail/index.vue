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
      <img :src="artistListDetail.artist.cover + '?param=1080y1080)'" alt="">
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
          <SongListItem v-for="(item, index) in artistListDetail.songs" :key="item.id" :config="item" :index="index" />
        </div>
      </van-tab>
      <van-tab title="专辑">
        <div class="album">
          <AlbumListItem v-for="(item, index) in artistListDetail.albums" :key="item.id" :config="item" />
        </div>
      </van-tab>
      <van-tab title="MV">
        <div class="mv">
          <MvListItem v-for="(item, index) in artistListDetail.mvs" :key="item.id" :config="item" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import MvListItem from "@/components/MvListItem/index.vue"// mv列表项
import AlbumListItem from '@/components/albumListItem/index.vue'// 专辑列表组件
import SongListItem from '@/components/SongListItem/index.vue'// 歌曲列表项组件
import { useArtistListDetailStore } from '@/stores/artistListDetail.js'
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue'

const { artistListDetail, getArtistDetail, getArtistSongs, getArtistAlbum, getArtistMv } = useArtistListDetailStore()
const route = useRoute()
const active = ref(0)

// 获取歌手详情
await getArtistDetail(route.query.id)
// 获取歌手歌曲
await getArtistSongs(route.query.id)
// 获取歌手专辑
await getArtistAlbum(route.query.id)
// 获取歌手MV
await getArtistMv(route.query.id)

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/artistListDetail') getArtistDetail(newId);
});
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
    transition: all .3s;
    z-index: 2;

    .header__right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
  }

  .background {
    aspect-ratio: 1/1;
    height: auto;
    width: 100%;
    transition: all .3s; // 过渡动画
    position: sticky;
    top: calc(-100vw + 46px);
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      font-size: 0;
      display: block;
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
    }

    .song {
      box-sizing: border-box;
    }

    .album {
      box-sizing: border-box;
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