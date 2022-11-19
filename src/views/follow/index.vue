<template>
  <div class="follow">
    <van-tabs v-model:active="active">
      <van-tab title="标签 1" name="1">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <van-tab title="标签 2" name="2">内容 2</van-tab>
      <van-tab title="标签 3" name="3">内容 3</van-tab>
      <van-tab title="标签 4" name="4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
// 在页面没有加载完成之前，显示加载中的页面
import LoadingPage from '@/components/LoadingPage/index.vue'// 加载中
import { ref, onMounted } from 'vue';

const active = ref('3');
const loading = ref(false)
const list = ref([]);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};
</script>

<style scoped lang="less">
.follow {
  height: 100%;
  overflow-y: scroll;
}
</style>