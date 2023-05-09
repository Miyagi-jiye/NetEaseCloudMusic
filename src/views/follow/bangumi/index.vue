<template>
  <div class="bangumi">
    <van-tabs v-model:active="active" swipeable sticky>
      <van-tab
        v-for="(item, index) in bangumiData.calendar"
        :key="index"
        :title="item.weekday.cn"
      >
        <div class="bangumi-items">
          <BangumiItem v-for="item in item.items" :key="item.id" :data="item" />
        </div>
      </van-tab>
    </van-tabs>
    <BackButton />
  </div>
</template>

<script setup>
import BackButton from "./components/back.vue"; // 返回按钮
import BangumiItem from "./components/item.vue"; // 番剧列表
import { useBangumiStore } from "./store/index.js";
import { ref } from "vue";

const active = ref(0); // 默认选中的tab索引
const { bangumiData, getCalendar } = useBangumiStore();

await getCalendar();

// 获取系统时间判断今天是星期几，然后改变active的值
const getToday = () => {
  const date = new Date();
  const day = date.getDay();
  // 匹配星期几
  // switch (day) {
  //   case 0:
  //     active.value = 6; //星期日
  //     break;
  //   case 1:
  //     active.value = day - 1;
  //     break;
  //   case 2:
  //     active.value = day - 1;
  //     break;
  //   case 3:
  //     active.value = day - 1;
  //     break;
  //   case 4:
  //     active.value = day - 1;
  //     break;
  //   case 5:
  //     active.value = day - 1;
  //     break;
  //   case 6:
  //     active.value = day - 1;
  //     break;
  //   default:
  //     break;
  // }
  // 匹配星期几
  if (day == 0) {
    active.value = 6; //星期日
  } else {
    active.value = day - 1; //星期一索引为0，星期二索引为1，......
  }
};

getToday();
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
