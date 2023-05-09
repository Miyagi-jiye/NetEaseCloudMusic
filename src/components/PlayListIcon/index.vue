<template>
  <div class="PlayListIcon">
    <!-- 播放列表 -->
    <svg t="1668173044430" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="7833" :width="size" :height="size" @click="show = true">
      <path
        d="M138.666667 91.733333C115.2 74.666667 85.333333 93.866667 85.333333 123.733333v179.2c0 29.866667 29.866667 49.066667 53.333334 34.133334l140.8-89.6c23.466667-14.933333 23.466667-51.2 0-66.133334L138.666667 91.733333zM426.666667 170.666667c-23.466667 0-42.666667 19.2-42.666667 42.666666s19.2 42.666667 42.666667 42.666667h490.666666c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666666H426.666667zM64 512c0 23.466667 19.2 42.666667 42.666667 42.666667h810.666666c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667H106.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667M106.666667 853.333333h810.666666c23.466667 0 42.666667-19.2 42.666667-42.666666s-19.2-42.666667-42.666667-42.666667H106.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666"
        :fill="color" p-id="7834"></path>
    </svg>
    <!-- 播放列表弹出框 -->
    <van-popup v-model:show="show" round position="bottom" teleport="body"
      :style="{ height: '60%', width: 'calc(100% - 32px)', margin: '16px', borderRadius: '12px' }">
      <div class="PlayListIcon__popup nowrap">
        <!-- 标题 -->
        <div class="title">
          当前播放<span>({{ audioData.songs.length }})</span>
        </div>
        <!-- 功能 -->
        <div class="function">
          <div class="left">
            <van-icon name="revoke" />
            <span>列表循环</span>
          </div>
          <div class="right">
            <van-icon name="down" title="全部下载" />
            <van-icon name="add-o" title="收藏到歌单" />
            <van-icon name="delete-o" title="清空播放列表" @click="clearPlayList" />
          </div>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- 播放列表 -->
        <div class="playlist">
          <div class="playlist__item" v-for="item in audioData.songs" :key="item.id"
            @click="changeCurrentSong(item.id)">
            <!-- 左 -->
            <div class="left" :class="{ active: item.id == audioData.song.id }">
              <PlayingIcon :size="18" v-if="item.id == audioData.song.id" />
              <div class="name">
                <span>{{ item.name }}</span>
                <span class="ar-line">-</span>
                <span class="ar" v-for="ar in item.ar">{{ ar.name }}</span>
              </div>
            </div>
            <!-- 右 -->
            <div class="right">
              <div class="source">来源</div>
              <van-icon name="cross" class="delete" title="移除" @click.stop="removeSongFromPlayList(item.id)" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import PlayingIcon from "@/components/PlayingIcon/index.vue"
import { ref } from 'vue';
import { useAudioStore } from '@/stores/Audio.js';

const { audioData, changeCurrentSong, removeSongFromPlayList, clearPlayList } = useAudioStore();
const show = ref(false);
const props = defineProps({
  color: {
    type: String,
    default: 'var(--font-color-5)'
  },
  size: {
    type: Number,
    default: 22
  }
});
</script>

<style scoped lang="less">
.PlayListIcon {
  display: flex;

  &__popup {
    height: 100%;
    width: 100%;
    // padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .title {
      // margin-bottom: 12px;
      padding: 16px;
      font-size: 16px;
      font-weight: bold;
      color: var(--font-color-dark);

      span {
        color: var(--font-color-3);
        font-size: 12px;
        margin-left: 4px;
      }
    }

    .function {
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: var(--font-color-dark);

      .left {
        display: flex;
        align-items: center;

        span {
          margin-left: 8px;
        }
      }

      .right {
        display: flex;
        align-items: center;
        gap: 24px;
      }
    }

    .line {
      height: 1px;
      background: var(--font-color-2);
      margin: 12px 16px 0;
    }

    .playlist {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      margin-bottom: 16px;

      .active {
        color: #f9343d;
      }

      &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--font-color-dark);
        line-height: 2.6;
        font-size: 14px;
        padding: 0 16px;
        gap: 8px;

        &:hover {
          background: var(--song-list-hover);
        }

        .name {
          text-overflow: ellipsis;
          overflow: hidden;

          .ar {
            color: var(--font-color-3);
            font-size: 12px;

            &:not(:last-child)::after {
              content: '/';
              margin: 0 2px;
            }


          }

          .ar-line {
            color: var(--font-color-3);
            font-size: 12px;
            margin: 0 4px;
          }
        }

        .left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          overflow: hidden; // 左边溢出隐藏
        }

        .right {
          display: flex;
          align-items: center;
          gap: 12px;

          .source {
            border: 1px solid var(--font-color-3);
            border-radius: 20px;
            padding: 4px 6px;
            box-sizing: border-box;
            font-size: 12px;
            line-height: .5;
            color: var(--font-color-dark);
            cursor: pointer;

            &:hover {
              background-color: var(--font-color-3);
            }
          }

          .delete:hover {
            color: red;
          }
        }
      }
    }
  }
}
</style>