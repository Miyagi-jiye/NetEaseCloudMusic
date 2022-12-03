<template>
  <div class="PlayListItem" @click="routerPush('/songListDetail', { id: config.id })">
    <div class="PlayListItem__left">
      <ImgCard :imgUrl="(config.coverImgUrl ?? config.picUrl)" />
    </div>
    <div class="PlayListItem__center">
      <div class="PlayListItem__center__top">{{ config.name }}</div>
      <div class="PlayListItem__center__bottom">
        <span>{{ config.trackCount }}首</span>,
        <span>by {{ config.creator.nickname }}</span>,
        <span>播放{{ filterPlayCount(config.playCount) }}次</span>
      </div>
      <div v-if="config.description" class="PlayListItem__center__bottom">
        {{ config.description }}
      </div>
    </div>
    <!-- <div class="PlayListItem__right"></div> -->
  </div>
</template>

<script setup>
import { filterPlayCount } from '@/utils/useFilter.js'// 过滤播放次数
import ImgCard from '@/components/ImgCard/index.vue'// 歌单封面
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  // 歌单数据
  config: {
    id: Number,//歌单id
    coverImgUrl: String,//歌单封面
    picUrl: String,//歌单封面
    name: String,//歌单名
    trackCount: Number,//歌曲数量
    playCount: Number,//播放次数
    description: String,//歌单描述
    creator: {
      nickname: String,//创建者昵称
    },
  },
  // 搜索关键字
  keyword: String,
})

// 跳转到歌单详情
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.PlayListItem {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  cursor: pointer;
  // user-select: none; // 禁止选中文字
  // -webkit-user-select: none; // 禁止选中文字
  // -webkit-user-drag: none; // 禁止拖拽

  &:hover {
    background-color: var(--song-list-hover);
  }

  .PlayListItem__left {
    height: 100%;
  }

  .PlayListItem__center {
    flex: 1;
    overflow: hidden;

    .PlayListItem__center__top {
      font-size: 16px;
      font-weight: 700;
      color: var(--font-color-5);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .PlayListItem__center__bottom {
      margin-top: 4px;
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .PlayListItem__right {
    flex: 1;
  }
}
</style>