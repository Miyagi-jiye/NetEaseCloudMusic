<template>
  <!-- 歌单列表项 -->
  <div class="SongListItem" @click="playSong(config.id)">
    <PlayingIcon class="left" v-if="audioData.song.id == config.id" />
    <span class="left" v-else>{{ index + 1 }}</span>
    <div class="center ">
      <div class="top" :class="{ active: audioData.song.id == config.id }">
        {{ config.name }}<span v-for="alia in config.alia">({{ alia }})</span>
      </div>
      <div class="bottom">
        <Tags :config="config" style="float: left;" />
        <span v-for="ar in config.ar">{{ ar.name }}</span>
        - {{ config.al.name }}
      </div>
    </div>
    <div class="right">
      <MVIcon v-if="config.mv" :mvid="config.mv" />
      <van-icon name="ellipsis" size='20' color="#b4b4b4" />
    </div>
  </div>
</template>

<script setup>
import Tags from '@/components/tags/index.vue'// 引入标签组件
import MVIcon from '@/components/MVIcon/index.vue'// MV图标组件
import PlayingIcon from '@/components/PlayingIcon/index.vue'// 播放图标组件
import { useAudioStore } from '@/stores/Audio.js';

const { audioData, playSong } = useAudioStore()
const props = defineProps({
  config: Object,// 歌曲信息
  index: Number// 歌曲序号
})
</script>

<style scoped lang="less">
.SongListItem {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  box-sizing: border-box;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--song-list-hover);
  }

  .left {
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
  }

  .center {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;
    overflow: hidden;

    .top,
    .bottom {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .top {
      font-size: 14px;
      color: var(--song-list-color);

      span {
        color: #999999;
        margin-left: 4px;
      }
    }

    .active {
      color: #ff0000b3;
    }

    .bottom {
      font-size: 12px;
      color: #999999;
      line-height: 16px;
      // flex布局文本溢出省略号会失效
      // display: flex;
      // align-items: center;

      span:not(:last-child)::after {
        content: "/";
        margin: 0 4px;
      }

      // span:last-child {
      //   margin-right: 4px;
      // }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>