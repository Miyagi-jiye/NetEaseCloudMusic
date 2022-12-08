<template>
  <div class="bilibili">
    <van-search v-model="inputValue" placeholder="请输入用户UID" @search="onSearch" />

    <div class="center">
      <div v-for="item in store.list">

        <!-- 详情数据 -->
        <div class="center__item">
          <img class="left" :src="item.cover + '@120w_160h.webp'" alt="" referrerpolicy="no-referrer">
          <div class="right">
            <!-- 标题 -->
            <span class="title">{{ item.title }}</span>
            <!-- 简介 -->
            <span class="desc">{{ item.summary }}</span>
            <!-- 类型和地区 -->
            <span class="type-and-area">
              <span>{{ item.season_type_name }}</span>
              <span v-for="area in item.areas">{{ area.name }}</span>
              <span v-show="(isEnd(item.total_count, item.new_ep.title) == false)">全{{ item.total_count }}话</span>
              <span v-show="(isEnd(item.total_count, item.new_ep.title) == true)">已完结</span>
              <span v-if="item.new_ep.index_show">{{ item.new_ep.index_show }}</span>
              <span v-if="item.new_ep.pub_time" :class="todayUpdate(item.new_ep.pub_time) == true ? 'todayActive' : ''">
                {{ filterTime(item.new_ep.pub_time) }}
              </span>
              <span v-else>敬请期待</span>
            </span>
            <!-- 评分和tag -->
            <div class="score-and-tags">
              <span class="score" v-if="item.rating">{{ item.rating.score }}</span>
              <span class="no-score" v-else>暂无评分</span>
              <span class="tags">
                <span class="tag" v-for="tag in item.styles">{{ tag }}</span>
              </span>
            </div>
            <!-- 播放量，追番数，弹幕 -->
            <div class="stat">
              <span>{{ formatNum(item.stat.view) }}播放</span>
              <span>{{ formatNum(item.stat.follow) }}追番</span>
              <span>{{ formatNum(item.stat.danmaku) }}弹幕</span>
            </div>

          </div>
        </div>
        <!-- 更新集数方块 -->
        <ul class="update-ep" v-if="(item.total_count >= 0)">
          <li class="ep" :class="compare(item.new_ep.title, ep) ? 'epActive' : ''"
            v-for="ep in formatNumToArray(item.total_count)">
            {{ ep }}
          </li>
        </ul>

      </div>
    </div>

    <van-pagination v-model="store.bangumiParams.pn" :total-items="store.total" :items-per-page="store.bangumiParams.ps"
      @change="getFollowList()" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { bangumiFollowList, searchUser } from '../bilibili/api'
import { showNotify } from 'vant'

const inputValue = ref(null)
const store = reactive({
  searchParams: {
    keyword: "",
    limit: 10,
    page: 1,
  },
  bangumiParams: {
    type: 1,
    follow_status: 0,
    pn: 1,
    ps: 10,
    vmid: 24772083,
    ts: Date.now()
  },
  list: [],// 追番数据
  total: 0,// 追番总数
})

// 获取搜索用户数据
const getSearchUser = async () => {
  const res = await searchUser(store.searchParams)
  console.log("数据获取成功", res)
}
// 获取追番数据
const getFollowList = async () => {
  const res = await bangumiFollowList(store.bangumiParams)
  // 判断返回值是否为空
  if (res.data && res.data.list) {
    store.list = res.data.list
    store.total = res.data.total
    console.log("数据获取成功", res.data.list)
  } else {
    showNotify({ type: 'danger', message: '用户不存在或未开放权限' })
  }
}

// await getFollowList()

// 搜索
const onSearch = () => {
  // 判断输入框是否为空
  if (inputValue.value === null || inputValue.value === '') {
    showNotify({ type: 'danger', message: '请输入用户UID' })
    return
  } else {
    // 正则判断输入的值是否为数字
    const reg = /^[0-9]*$/
    if (reg.test(inputValue.value)) {
      store.params.vmid = Number(inputValue.value)
      console.log("输入的UID", store.params.vmid)
      getFollowList()
    } else {
      showNotify({
        type: 'danger',
        message: '请输入正确的用户UID'
      })
    }
  }
}
// 格式化播放量，弹幕量，追番量
const formatNum = (num) => {
  if (num > 10000) {
    return (num / 10000).toFixed(0) + '万'
  } else {
    return num
  }
}
// 过滤播放时间，格式：每周六00:23更新
const filterTime = (time) => {
  // 判断是否为空
  if (time === null || time === '') return '敬请期待'
  const week = ['日', '一', '二', '三', '四', '五', '六']
  const date = new Date(time)
  const day = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()
  // 判断是否为0，如果是0则显示00
  const h = hour < 10 ? '0' + hour : hour
  const m = minute < 10 ? '0' + minute : minute
  if (todayUpdate(time)) {
    return `今天${h}:${m}更新`
  } else {
    return `每周${week[day]}${h}:${m}更新`
  }
}
// 判断是否为今天更新
const todayUpdate = (time) => {
  // 全部转为时间，更新时间加上1周的时间
  const timeStr = new Date(time).getTime() + new Date(7 * 24 * 60 * 60 * 1000).getTime()
  // 判断年月日，今天的年月日和时间戳的年月日是否相等
  const year = new Date().getFullYear()// 返回年
  const month = new Date().getMonth() + 1// 返回月
  const day = new Date().getDate()// 返回日
  const up_year = new Date(timeStr).getFullYear()
  const up_month = new Date(timeStr).getMonth() + 1
  const up_day = new Date(timeStr).getDate()
  if (year === up_year && month === up_month && day === up_day) {
    return true
  } else {
    return false
  }
}
// 比较播放集数是否小于等于总集数
const compare = (new_ep_title, ep) => {
  if (new_ep_title == "全片" || new_ep_title == '正片') {
    return true
  }
  if (ep <= Number(new_ep_title)) {
    return true
  } else {
    return false
  }
}
// 将播放集数转换为数组,数组长度为集数
const formatNumToArray = (num) => {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i + 1)
  }
  return arr
}
// 判断是否已经完结,total_count为总集数，new_ep_title为最新集数
const isEnd = (total_count, new_ep_title) => {
  if (new_ep_title == "全片" || new_ep_title == '正片' && total_count == 1) {
    console.log("全片或者正片", new_ep_title)
    return true
  }
  if (total_count == Number(new_ep_title)) {
    return true
  } else {
    return false
  }
}
</script>

<style scoped lang="less">
.bilibili {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .center {
    flex: 1;
    display: flex;
    flex-direction: column;

    .center__item {
      display: flex;
      gap: 16px;
      padding: 16px;
      box-sizing: border-box;
    }

    .left {
      width: 120px;
      height: 160px;
      aspect-ratio: 3/4;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      // 标题
      .title {
        font-weight: 600;
        color: var(--font-color-dark);
        line-height: 24px;
        font-size: 18px;
        padding: 0 10px 0 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0 0 8px 0;
      }

      // 简介
      .desc {
        display: -webkit-box;
        font-weight: 400;
        color: var(--font-color-dark);
        line-height: 20px;
        max-height: 40px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0 0 8px 0;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
      }

      // 类型和地区
      .type-and-area {
        height: 14px;
        font-size: 12px;
        color: #999;
        line-height: 14px;
        margin-bottom: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        span:not(:last-child)::after {
          content: '';
          display: inline-block;
          vertical-align: top;
          width: 1px;
          height: 12px;
          margin: 0 6px;
          background-color: #b7c0cc;
        }
      }

      // 评分和tag
      .score-and-tags {
        display: flex;
        align-items: center;
        gap: 16px;
        overflow: hidden;

        .score {
          position: relative;
          height: 24px;
          line-height: 24px;
          font-weight: 700;
          font-size: 24px;
          color: #ffa726;
          margin-bottom: 8px;
          font-family: HelveticaNeue-Bold;
          padding-right: 14px;
          display: inline-block;
          width: fit-content;

          &::after {
            content: "分";
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            width: 14px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            text-align: right;
            font-family: PingFangSC-Regular;
            font-weight: 400;
          }
        }

        .no-score {
          position: relative;
          height: 24px;
          line-height: 24px;
          font-weight: 700;
          font-size: 18px;
          color: #a7a7a7;
          margin-bottom: 8px;
          font-family: HelveticaNeue-Bold;
          display: inline-block;
          width: fit-content;
          white-space: nowrap;
        }

        .tags {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;

          .tag {
            padding: 4px 8px;
            border-radius: 4px;
            background-color: #f2f2f2;
            color: #999;
            font-size: 12px;
            white-space: nowrap;
          }
        }
      }

      // 播放数据
      .stat {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span:not(:last-child)::after {
          content: '·';
          display: inline-block;
          margin: 0 6px;
        }
      }

      .update-ep {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        // margin: 6px;

        .ep {
          font-size: 12px;
          height: 24px;
          width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          // border: 1px solid;
          // box-sizing: border-box;
          background-color: #e0e0e0;
          cursor: pointer;

          &:hover {
            box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
          }
        }
      }


    }

    // 更新集数
    .update-ep {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin: 0 16px 16px 16px;

      .ep {
        font-size: 12px;
        height: 22px;
        width: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        // border: 1px solid;
        // box-sizing: border-box;
        background-color: #e0e0e0;
        cursor: pointer;

        &:hover {
          box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;
        }
      }
    }
  }
}

:deep(.van-search) {
  width: 100%;
}

:deep(.van-pagination) {
  width: 100%;
}

// 今日更新激活的颜色
.todayActive {
  color: #ff4d4f !important;
  // color: #4c90f0;
  font-weight: bold !important;
}

// 更新集数高亮颜色
.epActive {
  color: #fff !important;
  background-color: #4897ff !important;
}
</style>