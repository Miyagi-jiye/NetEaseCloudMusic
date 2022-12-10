<template>
  <div class="bangumi">
    <van-tabs v-model:active="active" swipeable sticky>
      <van-tab v-for="(item, index) in bangumiData.calendar" :title="`${item.weekday.en} ✦ ${item.weekday.cn}`">
        <div class="bangumi-items">
          <BangumiItem v-for="item in item.items" :key="item.id" :data="item" />
        </div>
      </van-tab>
    </van-tabs>
    <div class="back" v-draggable @click.prevent="$router.back()">
      <div class="back-inner"></div>
    </div>
  </div>
</template>

<script setup>
import BangumiItem from './components/item.vue'
import { useBangumiStore } from './store/index.js'
import { ref } from 'vue'

const active = ref(0)

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
  bottom: 20px !important;
}

.bangumi {
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  // 返回按钮
  .back {
    position: fixed;
    top: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    z-index: 555;

    // 选中时放大0.1倍
    &:active,
    :hover {
      transform: scale(1.1);

      .back-inner {
        background: rgba(0, 0, 0, 0.5);
      }
    }

    .back-inner {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .1);
      z-index: 1111;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      touch-action: none;
      margin: auto;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        z-index: 3;
        background: #fff;
        border-radius: 50%;
        transform: scale(.65);
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
        transition: all .2s ease-in-out
      }
    }
  }

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