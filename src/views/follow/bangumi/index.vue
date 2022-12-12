<template>
  <div class="bangumi">
    <van-tabs v-model:active="active" swipeable sticky>
      <van-tab v-for="(item, index) in bangumiData.calendar" :key="index" :title="item.weekday.cn">
        <div class="bangumi-items">
          <BangumiItem v-for="item in item.items" :key="item.id" :data="item" />
        </div>
      </van-tab>
    </van-tabs>
    <BackButton />
  </div>
</template>

<script setup>
import BackButton from './components/back.vue'// 返回按钮
import BangumiItem from './components/item.vue'// 番剧列表
import { useBangumiStore } from './store/index.js'
import { ref } from 'vue'

const active = ref(0)// 选中的tab索引
const { bangumiData, getCalendar } = useBangumiStore()

await getCalendar()

// 转换index索引，0等于星期一，6等于星期日，返回字符串类型 getWeek(index)
const getWeek = (index) => {
  const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  return week[index]
}
// 获取系统时间判断今天是星期几，然后改变active的值
const getToday = () => {
  const date = new Date()
  const day = date.getDay()
  active.value = day - 1// 索引是从0开始的，所以要减1
}

getToday()
</script>

<style scoped lang="less">
:deep(.van-tabs__line) {
  bottom: 22px !important;
  // width: 54px !important;
  // height: 30px !important;
}

:deep(.van-tab__text) {
  z-index: 2;
}

.bangumi {
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  .bangumi-items {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>