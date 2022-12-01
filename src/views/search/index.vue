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
      <div class="top__function">
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
    <!-- 热搜和搜索历史 -->
    <div class="content">
      <!-- 搜索历史记录 -->
      <div v-show="searchData.historyList.length > 0" class="content__searchHistory">
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
import { useSearchStore } from '@/stores/search.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { searchData, getHotDetail } = useSearchStore()

await getHotDetail()

// 返回按钮
function backClick() {
  searchData.keyword = ''// 清空搜索关键字
  router.go(-1)// 返回上一页
}
// 点击搜索
function searchClick() {
  // 判断是否有搜索关键字
  if (searchData.keyword) {
    searchData.searchParams.offset = 1// 重置偏移量
    router.push({ path: '/searchDetail' })// 路由跳转
  }
}
// 点击历史记录搜索
function historySearch(item) {
  searchData.keyword = item
  searchClick()
}
// 点击热门搜索关键字
function hotSearchClick(item) {
  searchData.keyword = item.searchWord
  searchClick()
}
</script>

<script>
export default { name: "search" }
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
        // display: grid;
        // grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        // gap: 16px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;

        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: var(--van-search-background);
          font-size: 12px;
          padding: 4px 12px;
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
}
</style>