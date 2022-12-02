<template>
  <div class="MvListItem" @click="routerPush('/mvListDetail', { id: config.id })">
    <div class="MvListItem__top">
      <img v-if="config.cover" v-lazy="config.cover" alt="">
      <img v-if="config.imgurl" v-lazy="config.imgurl" alt="">
      <div class="MvListItem__top__desc">
        <span class="MvListItem__top__desc__duration">{{ formatDuration(config.duration) }}</span>
        <span class="MvListItem__top__desc__playCount">
          <van-icon name="play-circle-o" class="playIcon" />{{ filterPlayCount(config.playCount) }}次播放
        </span>
      </div>
      <van-icon name="play-circle-o" class="MvListItem__top__playIcon" size="40" />
    </div>
    <div class="MvListItem__bottom">
      <div class="MvListItem__bottom__name nowrap">{{ config.name }}</div>
      <div class="MvListItem__bottom__artist nowrap">{{ config.artistName }}</div>
    </div>
  </div>
</template>

<script setup>
import { formatDuration, filterPlayCount } from "@/utils/useFilter.js";// 过滤播放时长,播放次数
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  config: {
    id: Number,// mv id
    name: String,// mv 名称
    artistName: String,// mv 歌手
    artists: Array,// mv 歌手
    cover: String,// mv 封面
    imgurl: String,// mv 封面
    duration: Number,// mv 时长
    playCount: Number,// mv 播放次数
  },
  keyword: String// 高亮关键字
})

// 跳转到mv详情页
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.MvListItem {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .MvListItem__top {
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      // box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

      .MvListItem__top__desc {
        transform: translateY(100%);
      }

      .MvListItem__top__playIcon {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .MvListItem__top__desc {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px;
      box-sizing: border-box;
      color: #fff;
      font-size: 12px;
      line-height: 1;
      transition: all .4s;

      .playIcon {
        margin-right: 4px;
      }
    }

    .MvListItem__top__playIcon {
      font-size: 10vw;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      transition: all .4s;

      &:hover {
        color: #ff3232;
      }
    }
  }

  .MvListItem__bottom {
    margin-top: 4px;

    .MvListItem__bottom__name {
      font-size: 14px;
      color: var(--font-color-5);
    }

    .MvListItem__bottom__artist {
      margin-top: 4px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>