<template>
  <div class="songListDetail__detail">
    <ImgCard class="left" :imgUrl="songListDetail.playlist.coverImgUrl" width="110px" height="110px" />
    <div class="right nowrap">
      <div class="name nowrap">{{ songListDetail.playlist.name }}</div>
      <div class="tags" v-if="songListDetail.playlist.tags">
        <van-tag color="#ffffff4a" round v-for="item in songListDetail.playlist.tags">
          {{ item }}
        </van-tag>
      </div>
      <div class="creator" @click="routerPush('/userListDetail', { id: songListDetail.playlist.creator.userId })">
        <img class="creator__avatarUrl" v-lazy="songListDetail.playlist.creator.avatarUrl + '?param=20y20'" alt="创建者">
        <div class="creator__nickname">{{ songListDetail.playlist.creator.nickname }}</div>
        <van-icon name="arrow" size="12" />
      </div>
      <Description class="description" :desc="songListDetail.playlist.description"
        v-if="songListDetail.playlist.description" :end="24" />
    </div>
  </div>
</template>

<script setup>
import ImgCard from '@/components/imgCard/index.vue'// 引入图片组件
import Description from '@/views/songListDetail/components/description.vue'// 描述组件
import { useSongListDetailStore } from '@/stores/songListDetail.js'
import { useRouter } from 'vue-router'

const router = useRouter();
const { songListDetail, getPlaylistDetail } = useSongListDetailStore();

//跳转到用户详情页
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.songListDetail__detail {
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
      width: fit-content; // 宽度自适应

      .creator__avatarUrl {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }
}
</style>