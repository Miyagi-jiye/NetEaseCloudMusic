<template>
  <div class="mvListDetail nowrap">
    <!-- 顶栏 -->
    <div class="mvListDetail__header">
      <van-icon name="arrow-left" size="22" @click="$router.back()" />
      <span class="nowrap">{{ mvListDetail.mv.name }}</span>
      <van-icon name="weapp-nav" size="22" />
    </div>
    <!-- 视频插件 -->
    <div style="aspect-ratio: 16 / 9;width: 100%;">
      <videoPlay v-bind="options" @play="onPlay" />
    </div>
    <!-- mv信息 -->
    <div class="mvListDetail__info">
      <!-- 作者 -->
      <div class="mvListDetail__info__top">
        <div class="mvListDetail__info__top__left">
          <img :src="mvListDetail.mv.artists[0].img1v1Url + '?param=50y50'" alt="">
          <span>{{ mvListDetail.mv.artists[0].name }}</span>
        </div>
        <FollowButton :id="mvListDetail.mv.artists[0].id" :followed="mvListDetail.mv.artists[0].followed" />
      </div>
      <!-- 歌曲信息 -->
      <div class="mvListDetail__info__bottom">
        <span>{{ mvListDetail.mv.name }}</span>
        <span>发布时间：{{ mvListDetail.mv.publishTime }}</span>
        <span v-if="mvListDetail.mv.desc">简介：{{ mvListDetail.mv.desc }}</span>
      </div>
      <!--播放量，收藏，评论，分享-->
      <div class="mvListDetail__info__icon">
        <div class="mvListDetail__info__icon__item">
          <van-icon name="play-circle-o" />
          <span>{{ filterPlayCount(mvListDetail.mv.playCount) }}</span>
        </div>
        <div class="mvListDetail__info__icon__item">
          <van-icon name="star-o" />
          <span>{{ filterPlayCount(mvListDetail.mv.subCount) }}</span>
        </div>
        <div class="mvListDetail__info__icon__item">
          <van-icon name="chat-o" />
          <span>{{ filterPlayCount(mvListDetail.mv.commentCount) }}</span>
        </div>
        <div class="mvListDetail__info__icon__item">
          <van-icon name="share-o" />
          <span>{{ filterPlayCount(mvListDetail.mv.shareCount) }}</span>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="mvListDetail__info__line"></div>
      <!-- 相似MV推荐 -->
      <div class="mvListDetail__info__recommend">
        <div class="mvListDetail__info__recommend__title">相似MV推荐</div>
        <div class="mvListDetail__info__recommend__list">
          <MvListItem v-for="item in mvListDetail.simiMvs" :key="item.id" :config="item" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import MvListItem from "@/components/MvListItem/index.vue";// mv列表项
import FollowButton from '@/components/FollowButton/index.vue';// 关注按钮
import "vue3-video-play/dist/style.css"; // vue3-video-play插件样式文件
import { videoPlay } from "vue3-video-play"; // vue3-video-play插件
import { reactive, watch, onMounted } from "vue";
import { useMvListDetailStore } from '@/stores/mvListDetail.js'
import { useAudioStore } from '@/stores/audio.js'
import { useRoute } from 'vue-router'
import { filterPlayCount } from '@/utils/useFilter.js'

const { getMvDetail, getMvUrl, mvListDetail, getSimiMv } = useMvListDetailStore()
const { play } = useAudioStore()
const route = useRoute()
// 播放器配置
const options = reactive({
  width: "100%", //播放器高度
  height: "auto", //播放器高度
  color: "#f9343d", //主题色
  title: "", //视频名称
  // poster: "",//视频封面
  src: '', //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "fullScreen",
  ], //显示所有按钮,
});

// 初始化数据
async function init() {
  await getMvDetail(route.query.id)// 获取mv详情
  await getMvUrl(route.query.id, 1080)// 获取mv播放地址,分辨率默认选择1080p
  await getSimiMv(route.query.id)// 相似mv
  options.src = mvListDetail.mvUrl// 设置播放地址
  options.title = mvListDetail.mv.name// 设置播放器标题
}

await init()

// 播放器事件
function onPlay() {
  console.log("视频播放时暂停音乐播放");
  play(false)// 暂停音乐播放
};

// 监听路由id变化，判断是否在当前页面
watch(() => route.query.id, (newId) => {
  if (route.path === '/mvListDetail') init();
});
</script>

<style scoped lang="less">
.mvListDetail {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: var(--van-search-background);
}

.mvListDetail__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--van-search-background);
  padding: 16px;
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
}

.mvListDetail__info {
  // padding: 16px;
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: var(--font-color-dark);
    padding: 16px;

    &__left {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 16px;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span:nth-child(1) {
      color: var(--font-color-dark);
      font-size: 20px;
      font-weight: 700;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: #999;
    }

    span:nth-child(3) {
      font-size: 14px;
      color: #999;
      white-space: normal;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 16px;
    color: #999;
    font-size: 24px;
    padding: 0 16px;

    &__item {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 2px;

      span {
        font-size: 12px;
      }
    }
  }

  &__line {
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin-top: 10px;
  }

  &__recommend {
    padding: 16px;

    &__title {
      font-size: 16px;
      color: var(--font-color-dark);
      font-weight: 700;
    }

    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
  }
}
</style>