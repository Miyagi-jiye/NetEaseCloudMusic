<template>
  <div class="albumListDetail">
    <div class="background" :style="{ backgroundImage: 'url(' + albumListDetail.album.picUrl + '?param=10y10)' }">
      <div class="filter">
        <!-- 顶部 -->
        <div class="albumListDetail__header">
          <van-icon class="left" name="arrow-left" size='23' @click="$router.back()" />
          <div class="right">
            <span>专辑</span>
            <div class="right__right">
              <van-icon name="search" size='23' />
              <van-icon name="ellipsis" size='23' />
            </div>
          </div>
        </div>
        <!-- 详细信息 -->
        <div class="albumListDetail__detail">
          <ImgCard class="left" :imgUrl="albumListDetail.album.picUrl" width="110px" height="110px" />
          <div class="right nowrap">
            <div class="name nowrap">{{ albumListDetail.album.name }}</div>
            <div class="tags" v-if="albumListDetail.album.tags">
              <van-tag color="#ffffff4a" round v-for="item in albumListDetail.album.tags">
                {{ item }}
              </van-tag>
            </div>
            <span class="creator">
              歌手：
              <span class="nowrap">
                <span v-for="item in albumListDetail.album.artists">
                  {{ item.name }}
                </span>
              </span>
              <van-icon name="arrow" size="12" />
            </span>
            <div class="publishTime">发行时间：{{ formatDate(albumListDetail.album.publishTime) }}</div>
            <Description class="description" :desc="albumListDetail.album.description"
              v-if="albumListDetail.album.description" :end="24" />
          </div>
        </div>
        <!-- 歌曲信息 -->
        <div class="albumListDetail__content">
          <!-- 收藏，评论，分享 -->
          <SubCard class="subCard" height="40px" />
          <!-- 操作栏 -->
          <FunctionBar :songs="albumListDetail.songs" />
          <!-- 歌曲列表 -->
          <div class="songList">
            <SongListItem v-for="(item, index) in albumListDetail.songs" :config="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <van-back-top right="32px" bottom="76px" target=".albumListDetail" />
  </div>
</template>

<script setup>
import SubCard from '@/views/songListDetail/components/subCard.vue'// 引入收藏，评论，分享组件
import SongListItem from "@/components/SongListItem/index.vue"// 歌曲列表项
import FunctionBar from '@/views/songListDetail/components/functionBar.vue'// 操作栏组件
import ImgCard from '@/components/imgCard/index.vue'// 图片组件
import Description from '@/views/songListDetail/components/description.vue'// 描述组件
import { useAlbumListDetailStore } from '@/stores/albumListDetail.js'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils/useFilter.js'

const { albumListDetail, getAlbumDetail } = useAlbumListDetailStore();
const route = useRoute();

// 初始化执行一次,等待数据返回
await getAlbumDetail(route.query.id);// 获取专辑详情

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/albumListDetail') getAlbumDetail(newId);
});
</script>

<style scoped lang="less">
.albumListDetail {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
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
}

.albumListDetail__header {
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

.albumListDetail__detail {
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
      line-height: 1;
    }

    .publishTime {
      color: #ffffffb5;
      font-size: 12px;
    }
  }
}

.albumListDetail__content {
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

  .songList {
    display: flex;
    flex-direction: column;
  }
}
</style>