<template>
  <div class="AlbumListItem">
    <div class="AlbumListItem__left">
      <img v-lazy="config.picUrl + '?param=100y100'" alt="" />
      <div class="disc"></div>
      <div class="shadow" :style="'background-image: url(' + config.picUrl + '?param=10y10)'"></div>
    </div>
    <div class="AlbumListItem__right">
      <div class="AlbumListItem__right__title" v-html="highlight(config.name)"></div>
      <div class="AlbumListItem__right__artists">
        作者：
        <span v-for="item in config.artists">
          <span v-html="highlight(item.name)"></span>
        </span>
      </div>
      <div class="AlbumListItem__right__desc">
        <!-- <span>{{ config.artist.name }}</span> -->
        <span>发布日期：{{ formatDate(config.publishTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/useFilter.js'
import { toRaw } from 'vue';

const props = defineProps({
  // 专辑信息
  config: {
    id: Number,//专辑id
    name: String,//专辑名称
    artists: Array,//歌手
    publishTime: Number,//发布时间
    picUrl: String,//专辑封面
  },
  // 高亮关键字
  keyword: {
    type: String,
    required: true
  }
})
// 匹配所有关键字，高亮
const reg = new RegExp(props.keyword, 'g')
// 让搜索关键字失去响应式
const keyword = toRaw(props.keyword)

// 高亮关键字(css样式已在全局定义)
function highlight(str) {
  return str.replace(reg, '<span class="highlight">' + keyword + '</span>')
}
</script>

<style scoped lang="less">
.AlbumListItem {
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--song-list-hover);
  }

  .AlbumListItem__left {
    width: 65px;
    height: 65px;
    // border-radius: 4px;
    // overflow: hidden;
    position: relative;
    z-index: 1;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: hidden;
      // border-radius: 4px;
    }

    .shadow {
      position: absolute;
      top: 6px;
      right: 0px;
      height: 100%;
      width: 100%;
      filter: blur(2px) opacity(0.6);
      transform: scale(.86);
      z-index: -2;
      background-size: cover;
      aspect-ratio: 1 / 1;
    }

    // 使用css绘制唱片
    .disc {
      width: 50px;
      height: 50px;
      aspect-ratio: 1 / 1; // 保持图片正方形
      position: absolute;
      top: 50%;
      transform: translateY(-50%); // 使唱片垂直居中
      left: 25px;
      z-index: -1;
      // 保证暗黑模式也能看见唱片轮廓
      border: 1px solid #ffffff42;
      border-radius: 50%;
      background-color: #000000;
    }
  }

  .AlbumListItem__right {
    flex: 1;
    margin-left: 20px;
    overflow: hidden;

    .AlbumListItem__right__title {
      font-size: 16px;
      color: var(--font-color-5);
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .AlbumListItem__right__artists {
      // display: flex;
      // align-items: center;
      // gap: 4px;
      margin-bottom: 5px;
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;

      span:not(:last-child):after {
        content: '/';
        margin: 0 4px;
      }
    }

    .AlbumListItem__right__desc {
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      align-items: baseline;

      span {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>