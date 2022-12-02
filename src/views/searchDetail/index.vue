<template>
  <div class="searchDetail">
    <div class="searchInput">
      <van-icon name="arrow-left" size="22" @click="$router.back()" />
      <van-search v-model="searchData.keyword" placeholder="请输入搜索关键词" input-align="center" shape='round'
        :clearable="false" @keydown.enter.stop="searchClick()" />
      <span class="searchBtn" @click="searchClick()">搜索</span>
    </div>
    <div class="searchResult">
      <van-tabs v-model:active="searchData.searchParams.type" line-width="30px" class="searchResult__top">
        <van-tab title="单曲" :name="1">

          <LoadingPage v-show="loadingPage == true" style="margin-top:20vh" />

          <van-list class="searchResult__songs" v-show="loadingPage == false" v-model:loading="loading"
            :finished="finished" finished-text="没有更多了" @load="onLoad('songs')">
            <SongListItem v-for="(item, index) in searchData.searchResult.songs" :key="item.id" :config="item"
              :index="index" :keyword="searchData.keyword" />
          </van-list>

        </van-tab>
        <van-tab title="专辑" :name="10">

          <LoadingPage v-show="loadingPage == true" style="margin-top:20vh" />

          <van-list class="searchResult__albums" v-show="loadingPage == false" v-model:loading="loading"
            :finished="finished" finished-text="没有更多了" @load="onLoad('albums')">
            <AlbumListItem v-for="(item, index) in searchData.searchResult.albums" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </van-list>

        </van-tab>
        <van-tab title="歌手" :name="100">

          <LoadingPage v-show="loadingPage == true" style="margin-top:20vh" />

          <van-list class="searchResult__artists" v-show="loadingPage == false" v-model:loading="loading"
            :finished="finished" finished-text="没有更多了" @load="onLoad('artists')">
            <ArtistListItem v-for="(item, index) in searchData.searchResult.artists" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </van-list>

        </van-tab>
        <van-tab title="歌单" :name="1000">

          <LoadingPage v-show="loadingPage == true" style="margin-top:20vh" />

          <van-list class="searchResult__playlists" v-show="loadingPage == false" v-model:loading="loading"
            :finished="finished" finished-text="没有更多了" @load="onLoad('playlists')">
            <PlayListItem v-for="(item, index) in searchData.searchResult.playlists" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </van-list>

        </van-tab>
        <van-tab title="用户" :name="1002">

          <LoadingPage v-show="loadingPage == true" style="margin-top:20vh" />

          <van-list class="searchResult__users" v-show="loadingPage == false" v-model:loading="loading"
            :finished="finished" finished-text="没有更多了" @load="onLoad('userlist')">
            <UserListItem v-for="(item, index) in searchData.searchResult.userprofiles" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </van-list>

        </van-tab>
        <van-tab title="MV" :name="1004">

          <LoadingPage v-show="loadingPage == true" style="margin-top:20vh" />

          <van-list class="searchResult__mvs" v-show="loadingPage == false" v-model:loading="loading"
            :finished="finished" finished-text="没有更多了" @load="onLoad('mvs')">
            <MvListItem v-for="(item, index) in searchData.searchResult.mvs" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </van-list>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import LoadingPage from '@/components/loadingPage/block.vue';// 加载中
import MvListItem from '@/components/MvListItem/index.vue'// mv列表
import UserListItem from '@/components/UserListItem/index.vue'// 用户列表
import PlayListItem from '@/components/PlayListItem/index.vue'// 歌单列表
import ArtistListItem from '@/components/ArtistListItem/index.vue'// 歌手列表
import SongListItem from '@/components/SongListItem/index.vue'//单曲
import AlbumListItem from '@/components/AlbumListItem/index.vue'//专辑
import { useSearchStore } from '@/stores/search.js'
import { watch, ref, onUpdated, onBeforeUpdate, nextTick } from 'vue'

const loading = ref(false)
const finished = ref(false)
const loadingPage = ref(false)
const { searchData, getSearch } = useSearchStore()

await getSearch()

// 无限加载
const onLoad = async (name) => {
  searchData.searchParams.offset++//页数
  await getSearch()// 异步更新数据
  loading.value = false;// 加载状态结束
  // 数据全部加载完成
  if (name == 'songs' && searchData.searchResult.songs.length >= searchData.searchResult.songCount) {
    finished.value = true
    console.log("单曲全部加载完成")
  } else if (name == 'albums' && searchData.searchResult.albums.length >= searchData.searchResult.albumCount) {
    finished.value = true
    console.log("专辑全部加载完成")
  } else if (name == 'artists' && searchData.searchResult.artists.length >= searchData.searchResult.artistCount) {
    finished.value = true
    console.log("歌手全部加载完成")
  } else if (name == 'playlists' && searchData.searchResult.playlists.length >= searchData.searchResult.playlistCount) {
    finished.value = true
    console.log("歌单全部加载完成")
  } else if (name == 'userlist' && searchData.searchResult.userprofiles.length >= searchData.searchResult.userprofileCount) {
    finished.value = true
    console.log("用户全部加载完成")
  } else if (name == 'mvs' && searchData.searchResult.mvs.length >= searchData.searchResult.mvCount) {
    finished.value = true
    console.log("MV全部加载完成")
  } else {
    finished.value = false
  }
};

// 点击搜索
const searchClick = () => {
  const searchDetail = document.querySelector('.searchDetail')
  if (searchDetail) searchDetail.scrollTop = 0// 返回顶部
  searchData.searchParams.offset = 1// 重置页面
  finished.value = false// 重置加载状态
  loadingPage.value = true// 加载中
  setTimeout(() => {
    getSearch()
  }, 0);
}

// 监听tab栏切换
watch(() => searchData.searchParams.type, () => {
  searchClick()
})

// 页面刷新，重置搜索参数
window.onbeforeunload = () => {
  searchData.searchParams.offset = 1
  finished.value = false// 重置加载状态
}

// 在页面重新渲染完成后隐藏加载中
onUpdated(() => {
  setTimeout(() => {
    loadingPage.value = false
    console.log("页面重新渲染完成")
  }, 600);
})
</script>

<style scoped lang="less">
:deep(.van-search__field) {
  height: 28px;
}

:deep(.van-tabs__line) {
  bottom: 22px;
}

:deep(.van-tabs__wrap) {
  position: sticky;
  top: 46px;
  z-index: 10;
}

:deep(.van-search) {
  height: 46px;
  flex: 1;
  padding: 0 32px;
}

.searchDetail {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.searchInput {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  width: 100%;
  background: var(--van-search-background);
  padding: 0 16px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 10;

  .searchBtn {
    cursor: pointer;
  }
}

// 搜索返回内容
.searchResult {
  display: flex;
  flex-direction: column;
  color: var(--font-color-5);
  flex: 1;
  // overflow-y: scroll;

  .searchResult__songs {
    display: flex;
    flex-direction: column;
    background: var(--van-search-background)
  }

  .searchResult__albums {
    display: flex;
    flex-direction: column;
    background: var(--van-search-background)
  }

  .searchResult__artists {
    display: flex;
    flex-direction: column;
    background: var(--van-search-background)
  }

  .searchResult__playlists {
    display: flex;
    flex-direction: column;
    background: var(--van-search-background)
  }

  .searchResult__users {
    display: flex;
    flex-direction: column;
    background: var(--van-search-background)
  }

  .searchResult__mvs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    padding: 16px;
    background: var(--van-search-background)
  }
}
</style>