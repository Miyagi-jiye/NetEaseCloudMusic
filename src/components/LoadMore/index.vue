<template>
  <div class="loadMore" v-intersection-observer="[onIntersectionObserver, { root }]">
    <!-- 默认插槽 -->
    <slot name="default">
      <span @click="loadMore" v-show="loading == false">加载更多</span>
      <van-loading size="24px" v-show="loading == true">加载中...</van-loading>
    </slot>
  </div>
</template>

<script setup>
// TODO: 一些小bug，进入其他歌单root根节点获取不到，需要手动刷新
// 解决办法：取消root根节点监听，直接监听window
import { vIntersectionObserver } from '@vueuse/components'// 可见性监听自定义指令

const emit = defineEmits(['loadMore'])// 定义事件
const props = defineProps({
  root: {// 可见性监听的根元素
    required: true,
    default: null
  },
  loading: {// 是否显示加载中
    type: Boolean,
    required: true,
    default: false
  }
})

// 监听对象可见性改变时触发
function onIntersectionObserver([{ isIntersecting }]) {
  console.log("👀可见性", isIntersecting)
  if (isIntersecting) loadMore()// 元素可见时加载更多
}

// 加载更多
function loadMore() {
  emit('loadMore')// 触发父组件loadMore事件
}
</script>

<style scoped lang="less">
.loadMore {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;

  span {
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>