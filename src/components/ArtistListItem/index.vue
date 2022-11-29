<template>
  <div class="ArtistListItem">
    <div class="ArtistListItem__left" @click="routerPush('/artistListDetail', { id: config.id })">
      <img v-lazy="config.picUrl + '?param=100y100'" alt="" />
    </div>
    <div class="ArtistListItem__center" @click="routerPush('/artistListDetail', { id: config.id })">
      <div class="ArtistListItem__center__top">
        <span class="ArtistListItem__center__top__name">{{ config.name }}</span>
        <span v-if="config.alias[0]" class="ArtistListItem__center__top__desc">({{ config.alias[0] }})</span>
      </div>
      <div class="ArtistListItem__center__bottom">
        <div class="ArtistListItem__center__bottom__desc">
          <span>专辑数: {{ config.albumSize }}</span>
          <span>mv数: {{ config.mvSize }}</span>
        </div>
      </div>
    </div>
    <div class="ArtistListItem__right">
      <FollowButton :followed="config.followed" :id="config.id" />
    </div>
  </div>
</template>

<script setup>
import FollowButton from '@/components/FollowButton/index.vue'// 关注按钮组件
import { toRaw } from 'vue';
import { useRouter } from "vue-router"

const router = useRouter()//路由
const props = defineProps({
  // 歌手信息
  config: {
    id: Number,// 歌手id
    name: String,// 歌手名字
    followed: Boolean,// 是否关注
    picUrl: String,// 歌手头像
    albumSize: Number,// 专辑数
    mvSize: Number,// mv数
  },
  // 高亮关键字
  keyword: {
    type: String,
    required: false
  }
})
// 匹配所有关键字，高亮
const reg = new RegExp(props.keyword, 'g')
// 让搜索关键字失去响应式
const keyword = toRaw(props.keyword)

// 高亮关键字(css样式已在全局定义)
function highlightName(str) {
  return str.replace(reg, `<span class="${audioData.song.id == props.config.id ? 'active' : 'highlight'}">${keyword}</span>`)
}

//跳转到歌手详情页
function routerPush(path, query) {
  router.push({ path, query })
}
</script>

<style scoped lang="less">
.ArtistListItem {
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  // cursor: pointer;

  &:hover {
    background-color: var(--song-list-hover);
  }


  .ArtistListItem__left {
    width: 50px;
    height: 50px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .ArtistListItem__center {
    flex: 1;
    margin-right: 10px;
    overflow: hidden;

    .ArtistListItem__center__top {
      text-overflow: ellipsis;
      overflow: hidden;

      .ArtistListItem__center__top__name {
        font-size: 16px;
        font-weight: 700;
        margin-right: 4px;
      }

      .ArtistListItem__center__top__desc {
        font-size: 12px;
        color: #b4b4b4;
      }
    }

    .ArtistListItem__center__bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      .ArtistListItem__center__bottom__desc {
        font-size: 12px;
        color: #b4b4b4;
        text-overflow: ellipsis;
        overflow: hidden;

        span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>