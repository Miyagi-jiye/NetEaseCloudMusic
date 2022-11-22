<template>
  <div class="SongCard nowrap" @click="playSong(config.songId)">
    <div class="SongCard__image">
      <img v-lazy="config.imageUrl + '?param=200y200'" alt="歌曲封面" class="cover" />
    </div>
    <div class="SongCard__info">
      <h3 class="name">{{ config.name }}</h3>
      <p class="ar">
        <span v-for="ar in config.ar">{{ ar.name }}</span>
      </p>
      <div class="tag">
        <van-tag type="primary" color="var(--tag-color-1)" text-color="var(--tag-background-color-1)">
          {{ formatDuration(config.duration) }}
        </van-tag>
        <van-tag type="warning" plain v-if="config.sq">SQ</van-tag>
        <van-tag type="danger" plain v-if="config.mv !== 0">MV</van-tag>
        <van-tag type="success" plain v-if="config.fee == 8">免费</van-tag>
        <van-tag type="success" plain v-if="config.fee == 0">免费</van-tag>
        <van-tag type="warning" plain v-if="config.fee == 4">需购买</van-tag>
        <van-tag type="warning" plain v-if="config.fee == 1">会员</van-tag>
      </div>
    </div>
    <div class="SongCard__right">
      <MVIcon v-if="config.mv" :mvid="config.mv" />
    </div>
  </div>
</template>

<script setup>
import MVIcon from '@/components/MVIcon/index.vue'// MV图标组件
import { formatDuration } from '@/utils/useFilter.js'
import { useAudioStore } from '@/stores/Audio.js';

const { playSong, audioData } = useAudioStore()
const props = defineProps({
  config: {
    // 歌曲id
    songId: Number,
    // 歌曲名
    name: String,
    // 歌手
    ar: Array,
    // 歌曲图片
    imageUrl: String,
    // 专辑
    al: Object,
    // 歌曲时长
    duration: Number,
    // 是否免费播放(0: 免费或无版权 1: VIP歌曲 4: 购买专辑 8: 非会员可免费播放低音质，会员可播放高音质及下载)
    fee: Number,
    // 是否有mv(非0即有)
    mv: Number,
    // 是否SQ音质(非null即有)
    sq: Number,
    // 歌曲权限
    privilege: Object,
  }
})

</script>

<style scoped lang="less">
.SongCard {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 70px;
  width: 100%;
  overflow: hidden;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    height: 100%;
    flex: 1;

    .name {
      font-size: 14px;
      font-weight: 700;
      color: var(--font-color-dark);
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: normal;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .ar {
      font-size: 14px;
      color: var(--font-color-4);
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: normal;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 12px;

      // 添加伪元素分割线，排除最后一个
      span:not(:last-child)::after {
        content: '/';
        margin: 0 4px;
      }
    }

    .tag {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  &__image {
    .cover {
      width: 60px;
      height: 60px;
      aspect-ratio: 1 / 1; // 保持图片正方形
      // border-radius: 4px;
      display: block; // 解决图片缝隙问题
      box-sizing: border-box;
      padding: 1px;
      border: 1px solid #ccc;
    }
  }
}
</style>