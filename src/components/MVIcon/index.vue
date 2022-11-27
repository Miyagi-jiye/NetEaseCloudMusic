<template>
  <div class="MVIcon" @click.stop="routerPush" title="播放MV">
    <svg t="1668065190182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="15909" :width="size" :height="size" :style="{ color: color }">
      <path
        d="M505.173333 384.426667c-32.426667-24.32-78.506667-1.706667-78.506666 38.826666v177.493334c0 40.533333 46.08 63.573333 78.506666 38.826666l116.48-88.746666c25.6-19.626667 25.6-58.453333 0-77.653334l-116.48-88.746666z m260.693334-203.093334c-168.533333-14.08-339.2-14.08-507.733334 0C135.253333 192 42.666667 288 42.666667 405.333333v213.333334c0 117.333333 92.586667 213.333333 215.466666 224 84.053333 7.253333 168.96 10.666667 253.866667 10.666666s169.813333-3.413333 253.866667-10.666666c122.88-10.666667 215.466667-106.666667 215.466666-224v-213.333334c0-117.333333-92.586667-213.333333-215.466666-224zM896 618.666667c0 72.533333-58.88 132.266667-137.386667 138.666666-163.413333 14.08-329.386667 14.08-493.226666 0C186.88 750.933333 128 691.2 128 618.666667v-213.333334c0-72.533333 58.88-132.266667 137.386667-138.666666C347.306667 259.413333 429.653333 256 512 256s164.693333 3.413333 246.613333 10.666667C837.12 273.066667 896 332.8 896 405.333333v213.333334z"
        p-id="15910" fill="currentColor"></path>
    </svg>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  mvid: Number,// MV的id
  color: {
    type: String,
    default: '#b4b4b4'
  },
  size: {
    type: Number,
    default: 24
  }
})

// 跳转到MV详情页
const routerPush = () => {
  router.push({
    path: '/mvListDetail',
    query: {
      id: props.mvid
    }
  })
}
</script>

<style scoped lang="less">
.MVIcon {
  display: flex;
  cursor: pointer;

  svg.icon {
    transition: all 0.2s;

    &:hover {
      color: #f9343d !important;
    }
  }
}
</style>