<template>
  <div class="follow">

    <div class="bilibili-card" @click="routerPush('bilibili')" v-if="route.path=='/follow'">
      <div class="card">
        <img src="https://i0.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png@1000w_400h_100q.webp"
          alt="" referrerpolicy="no-referrer">
        <div class="bilibili-logo">
          <BilibiliLogo />
        </div>
        <div class="mask"></div>
      </div>
    </div>

    <div class="bangumi-card" @click="routerPush('bangumi')" v-if="route.path == '/follow'">
      <div class="card">
        <img src="https://i0.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png@1000w_400h_100q.webp"
          alt="" referrerpolicy="no-referrer">
        <div class="bangumi-logo">
          <BangumiLogo />
        </div>
        <div class="mask"></div>
      </div>
    </div>

    <router-view />

  </div>
</template>

<script setup>
import BilibiliLogo from './bilibili/components/logo.vue'// logo
import BangumiLogo from './bangumi/components/logo.vue'// logo
import { useRoute, useRouter } from 'vue-router';
import { watch, ref } from 'vue';

const route = useRoute();
const router = useRouter();

// 路由跳转
const routerPush = (name) => {
  if (name === 'bilibili') {
    router.push({ path: '/follow/bilibili' });
  } else if (name === 'bangumi') {
    router.push({ path: '/follow/bangumi' });
  } else {
    return false;
  }
}
</script>

<style scoped lang="less">
.follow {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  // bilibili
  .bilibili-card {
    padding: 16px;
    box-sizing: border-box;

    .card {
      width: 100%;
      height: 160px;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .bilibili-logo {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      line-height: 1;

      &::after {
        content: '追番查询';
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #00aeec;
        font-size: 40px;
        font-weight: 700;
        margin-left: 16px;
        z-index: 2;
      }

    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255 / 50%);
      z-index: 1;
      backdrop-filter: blur(10px);
    }
  }

  // bangumi
  .bangumi-card {
    padding: 16px;
    box-sizing: border-box;

    .card {
      width: 100%;
      height: 160px;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .bangumi-logo {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      line-height: 1;

      &::after {
        content: '时间表';
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #F09199;
        font-size: 40px;
        font-weight: 700;
        margin-left: 16px;
        z-index: 2;
      }

    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255 / 50%);
      z-index: 1;
      backdrop-filter: blur(10px);
    }
  }
}
</style>