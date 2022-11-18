<template>
  <div class="search nowrap">
    <!-- 顶部搜索栏 -->
    <div class="top">
      <div class="top__search">
        <van-icon name="arrow-left" size="22" @click="backClick" />
        <van-search v-model="searchData.keyword" placeholder="请输入搜索关键词" input-align="center" shape='round'
          :clearable="false" @keydown.enter.stop="searchClick" />
        <span class="searchBtn" @click="searchClick">搜索</span>
      </div>
      <div class="top__function" v-show="showCard == false">
        <div class="top__function__item">
          <van-icon name="manager" size="16" />
          <span>歌手</span>
        </div>
        <div class="my-line"></div>
        <div class="top__function__item">
          <van-icon name="music" size="16" />
          <span>曲风</span>
        </div>
        <div class="my-line"></div>
        <div class="top__function__item">
          <van-icon name="diamond" size="16" />
          <span>专区</span>
        </div>
        <div class="my-line"></div>
        <div class="top__function__item">
          <van-icon name="browsing-history" size="16" />
          <span>识曲</span>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="searchResult" v-if="showCard == true">
      <van-tabs v-model:active="searchData.searchParams.type" line-width="30px" class="searchResult__top">
        <van-tab title="单曲" :name="1">
          <div class="searchResult__songs">
            <SongListItem v-for="(item, index) in searchData.searchResult.songs" :key="item.id" :config="item"
              :index="index" :keyword="searchData.keyword" />
          </div>
        </van-tab>
        <van-tab title="专辑" :name="10">
          <div class="searchResult__albums">
            <AlbumListItem v-for="(item, index) in searchData.searchResult.albums" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </div>
        </van-tab>
        <van-tab title="歌手" :name="100">
          <div class="searchResult__artists">
            <ArtistListItem v-for="(item, index) in searchData.searchResult.artists" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </div>
        </van-tab>
        <van-tab title="歌单" :name="1000">
          <div class="searchResult__playlists">
            <PlayListItem v-for="(item, index) in searchData.searchResult.playlists" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </div>
        </van-tab>
        <van-tab title="用户" :name="1002">
          <div class="searchResult__users">
            <UserListItem v-for="(item, index) in searchData.searchResult.userprofiles" :key="item.id" :config="item"
              :keyword="searchData.keyword" />
          </div>
        </van-tab>
        <van-tab title="MV" :name="1004">MV</van-tab>
      </van-tabs>
    </div>
    <!-- 热搜和搜索历史 -->
    <div class="content" v-else="showCard == false">
      <!-- 搜索历史记录 -->
      <div v-if="searchData.historyList.length > 0" class="content__searchHistory">
        <div class="content__searchHistory__title">
          <span>历史搜索</span>
          <van-icon name="delete" size="16" title="清空历史记录" @click="searchData.historyList = []" />
        </div>
        <div class="content__searchHistory__list">
          <!-- 搜索历史记录 -->
          <div class="content__searchHistory__list__item" v-for="item in searchData.historyList"
            @click="historySearch(item)">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="content__hotSearch">
        <div class="content__hotSearch__title">
          <span>热门搜索</span>
        </div>
        <div class="content__hotSearch__list">
          <!-- 热门搜索 -->
          <div class="content__hotSearch__list__item" v-for="(item, index) in searchData.hotDetail">
            <span class="content__hotSearch__list__item__left" :class="{ indexTopThree: index < 3 }">
              {{ index + 1 }}
            </span>
            <div class="content__hotSearch__list__item__right nowrap">
              <div style="display:flex;gap: 16px;align-items: center;">
                <span :class="{ topThree: index < 3 }" class="nowrap" @click="hotSearchClick(item)">
                  {{ item.searchWord }}
                </span>
                <img v-if="item.iconUrl" :src="item.iconUrl" alt="hot">
              </div>
              <span v-if="item.content" class="nowrap">{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserListItem from '@/components/UserListItem/index.vue'// 用户列表
import PlayListItem from '@/components/PlayListItem/index.vue'// 歌单列表
import ArtistListItem from '@/components/ArtistListItem/index.vue'// 歌手列表
import SongListItem from '@/components/SongListItem/index.vue'//单曲
import AlbumListItem from '@/components/AlbumListItem/index.vue'//专辑
import { useSearchStore } from '@/stores/search.js'
import { watch, ref } from 'vue'

const { searchData, getHotDetail, getSearch } = useSearchStore()
const showCard = ref(false)// 是否显示搜索结果

await getHotDetail()

// 返回按钮
function backClick() {
  // 判断是否显示搜索结果
  if (showCard.value) {
    // 显示热门搜索和搜索历史
    showCard.value = false
    // 清空搜索关键字
    searchData.keyword = ''
    // 变更默认激活的标签
    searchData.searchParams.type = 1
  } else {
    // 返回上一页
    window.history.go(-1)
  }
}
// 点击搜索
async function searchClick() {
  await getSearch()
  showCard.value = true// 显示搜索结果,隐藏热门搜索和搜索历史
}
// 点击历史记录搜索
function historySearch(item) {
  searchData.keyword = item
  searchClick()
}
// 监听tab栏切换
watch(
  () => searchData.searchParams.type,
  (val) => {
    console.log('监听tab栏切换', val)
    getSearch()
  },
  // { immediate: true }
)
// 点击热门搜索关键字
function hotSearchClick(item) {
  searchData.keyword = item.searchWord
  searchClick()
}
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
  top: 0;
  z-index: 10;
}

.search {
  height: 100%;
  width: 100%;
  // overflow-y: scroll;
  display: flex;
  flex-direction: column;

  .van-search {
    height: 46px;
    flex: 1;
    padding: 0 32px;
  }

  .top {
    display: flex;
    flex-direction: column;
    color: var(--font-color-5);
    // 粘性定位
    position: sticky;
    top: 0;
    z-index: 10;

    // 搜索框
    &__search {
      display: flex;
      align-items: center;
      background: var(--van-search-background);
      padding: 0 16px;
      box-sizing: border-box;

      .searchBtn {
        cursor: pointer;
      }
    }

    // 功能
    &__function {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 10px 0;
      background: var(--van-search-background);
      box-sizing: border-box;
      color: #F9343D;

      &__item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 14px;
        font-weight: 600;

        span {
          color: var(--font-color-5);
        }
      }
    }
  }

  .content {
    // display: none;
    display: flex;
    flex-direction: column;
    color: var(--font-color-5);
    flex: 1;
    overflow-y: scroll;

    // 搜索历史记录
    &__searchHistory {
      padding: 0 16px;
      box-sizing: border-box;

      &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        font-size: 14px;
        font-weight: 600;
      }

      &__list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        gap: 16px;

        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: var(--van-search-background);
          font-size: 12px;
          padding: 4px 4px;
          color: var(--font-color-4);
          cursor: pointer;
        }
      }
    }

    &__hotSearch {
      padding: 0 16px 16px 16px;
      box-sizing: border-box;

      &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        font-size: 14px;
        font-weight: 600;
      }

      &__list {
        // display: flex;
        // flex-direction: column;
        background: var(--van-search-background);
        border-radius: 8px;
        overflow: hidden;
        // grid布局
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        // gap: 16px;

        &__item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          padding: 16px;
          color: var(--font-color-4);

          &__left {
            color: var(--font-color-5);
            font-size: 14px;
            font-weight: 600;
            min-width: 16px;
          }

          &__right {
            display: flex;
            flex-direction: column;
            gap: 4px;

            // 热搜关键词
            span:nth-child(1) {
              font-size: 14px;
              color: var(--font-color-5);
              cursor: pointer;
            }

            // 热度图标
            img {
              height: 16px;
              object-fit: contain;
            }

            // 前三个字体加粗
            .topThree {
              font-weight: 600;
            }
          }

          // 前三个序号变红色
          .indexTopThree {
            color: #F9343D;
          }
        }
      }
    }
  }

  .searchResult {
    display: flex;
    flex-direction: column;
    color: var(--font-color-5);
    flex: 1;
    overflow-y: scroll;

    &__songs {
      display: flex;
      flex-direction: column;
      background: var(--van-search-background)
    }

    &__albums {
      display: flex;
      flex-direction: column;
      background: var(--van-search-background)
    }

    &__artists {
      display: flex;
      flex-direction: column;
      background: var(--van-search-background)
    }

    &__playlists {
      display: flex;
      flex-direction: column;
      background: var(--van-search-background)
    }

    &__users {
      display: flex;
      flex-direction: column;
      background: var(--van-search-background)
    }
  }
}
</style>