<template>
  <!-- 歌单列表项 -->
  <div class="SongListItem">
    <PlayingIcon class="left" v-if="audioData.song.id == config.id" />
    <span class="left" v-else>{{ index + 1 }}</span>
    <!-- 如果有传搜索关键字 -->
    <div v-if="keyword" class="center" @click="playSong(config.id)">
      <div class="top" :class="{ active: audioData.song.id == config.id }">
        <span v-html="highlightName(config.name)"></span>
        <span v-for="alia in config.alia" class="top__alia">
          (<span v-html="highlightAlia(alia)"></span>)
        </span>
      </div>
      <div class="bottom">
        <van-tag v-if="config.recommendReason" class="tag">
          {{ config.recommendReason }}
        </van-tag>
        <Tags :config="config" style="float: left;" />
        <span class="bottom__ar">
          <span v-for="ar in config.ar" class="bottom__ar__item">
            <span v-html="highlightAlia(ar.name)"></span>
          </span>
        </span>
        <span> - </span>
        <span class="bottom__al" v-html="highlightAlia(config.al.name)"></span>
      </div>
    </div>
    <!-- 没有搜索关键字 -->
    <div v-else class="center" @click="playSong(config.id)">
      <div class="top" :class="{ active: audioData.song.id == config.id }">
        {{ config.name }}<span v-for="alia in config.alia" class="top__alia">({{ alia }})</span>
      </div>
      <div class="bottom">
        <van-tag v-if="config.recommendReason" class="tag">
          {{ config.recommendReason }}
        </van-tag>
        <Tags :config="config" style="float: left;" />
        <span class="bottom__ar">
          <span v-for="ar in config.ar" class="bottom__ar__item">{{ ar.name }}</span>
        </span>
        <span> - </span>
        <span class="bottom__al">{{ config.al.name }}</span>
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
import { toRaw } from 'vue';

const { audioData, playSong } = useAudioStore()
const props = defineProps({
  // 歌曲数据
  config: {
    id: Number,// 歌曲id
    name: String,// 歌曲名
    alia: Array,// 歌曲别名
    ar: Array,// 歌手
    al: Object,// 专辑
    mv: Number,// mv id
    recommendReason: String,// 推荐理由(每日推荐有)
  },
  index: Number,// 歌曲序号
  keyword: String,// 搜索关键字
})

// 匹配所有关键字，高亮
const reg = new RegExp(props.keyword, 'g')
// 让搜索关键字失去响应式
const keyword = toRaw(props.keyword)
// 高亮关键字(css样式已在全局定义)
function highlightName(str) {
  return str.replace(reg, `<span class="${audioData.song.id == props.config.id ? 'active' : 'highlight'}">${keyword}</span>`)
}
function highlightAlia(str) {
  return str.replace(reg, `<span class="${audioData.song.id == props.config.id ? '' : 'highlight'}">${keyword}</span>`)
}
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

      &__alia {
        color: #999999;
        margin-left: 4px;
      }
    }

    // .active {
    //   color: #ff0000b3 !important;
    // }

    .bottom {
      font-size: 12px;
      color: #999999;
      line-height: 16px;

      .tag {
        color: var(--tag-background-color-1);
        background-color: var(--tag-color-1);
        margin-right: 4px;
      }

      // flex布局文本溢出省略号会失效
      // display: flex;
      // align-items: center;
      &__ar {
        &__item:not(:last-child):after {
          content: "/";
          margin: 0 4px;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>