<template>
  <div class="follow">

    <div class="top">
      <van-search v-model="inputValue" placeholder="请输入用户名" @search="onSearchUser" />
      <van-icon name="apps-o" size="22" class="top__right" @click="(showType = !showType)" />
    </div>

    <div v-if="show" class="content">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad('bangumi')">
        <div v-if="showType" class="list">
          <div v-for="item in store.list">
            <div class="list__item">
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
                  <span v-if="item.new_ep.pub_time"
                    :class="todayUpdate(item.new_ep.pub_time) == true ? 'todayActive' : ''">
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
                v-for="ep in formatNumToArray(item.total_count)" @click="toBilibili(item.url)">
                {{ ep }}
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="grid">
          <div v-for="item in store.list" class="grid__item">
            <!-- 封面 -->
            <img :src="item.cover + '@240w_320h.webp'" alt="" referrerpolicy="no-referrer">
            <!-- 详情 -->
            <div class="desc">
              <span>{{ item.title }}</span>
              <span>{{ item.new_ep.index_show }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div v-else class="user">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad('user')">
        <div class="user__item" v-for="item in store.result" :key="item.mid">
          <div class="left">
            <img :src="`https:${item.upic}@50w_50h.webp`" :alt="item.uname" referrerpolicy="no-referrer">
          </div>
          <div class="center">
            <div class="name">
              <span>{{ item.uname }}</span>
              <span class="level"
                :style="{ backgroundColor: item.level == 0 ? '#C0C0C0' : item.level == 1 ? '#C0C0C0' : item.level == 2 ? '#8BD29B' : item.level == 3 ? '#7BCDEF' : item.level == 4 ? '#FEBB8B' : item.level == 5 ? '#EE672A' : item.level == 6 ? '#FF0000' : '#F152F0' }">
                LV{{ item.level }}
              </span>
            </div>
            <span class="desc">{{ item.usign }}</span>
          </div>
          <div class="right">
            <MyButton @click="showBangumi(item.mid)" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup>
import MyButton from './button.vue'
import { ref, reactive } from 'vue'
import { bangumiFollowList, searchUser } from '../bilibili/api'
import { showNotify } from 'vant'

const show = ref(false)// 是否显示追番数据
const inputValue = ref(null)
const loading = ref(false)// list无限加载是否加载中
const finished = ref(false)// list无限加载是否加载完毕
const showType = ref(true)//grid:卡片 list：列表
const store = reactive({
  // 搜索用户参数
  userParams: {
    keyword: '',
    page: 1,
    limit: 10,
  },
  // 追番参数
  params: {
    type: 1,
    follow_status: 0,
    pn: 1,
    ps: 20,
    vmid: 24772083,
    ts: Date.now()
  },
  list: [],// 追番数据
  total: 0,// 追番总数
  result: [],// 搜索返回的用户数据
  numPages: 0,// 搜索返回的总页数
  numResults: 0,// 搜索返回的总数居条数
})

// 获取追番数据
const getFollowList = async () => {
  const res = await bangumiFollowList(store.params)
  // 判断返回值是否为空
  if (res.data && res.data.list) {
    // 判断是否是第一次加载
    if (store.params.pn === 1) {
      store.total = res.data.total
      store.list = res.data.list
      console.log("首次数据获取成功", res.data.list)
    } else {
      // 去重合并
      // store.list = store.list.concat(res.data.list)
      store.list = [...new Set([...store.list, ...res.data.list])]
      console.log("第", store.params.pn, "页", res.data.list)
    }
  } else {
    showNotify({ type: 'danger', message: '未开放权限' })
    show.value = false
    return false
  }
}
// 获取用户信息
const getUserInfo = async () => {
  const res = await searchUser(store.userParams)
  // 判断返回值是否为空
  if (res.data && res.data.result) {
    // 判断是否是第一次加载
    if (store.userParams.page === 1) {
      store.result = res.data.result
      store.numPages = res.data.numPages
      store.numResults = res.data.numResults
      console.log("用户信息", res.data)
    } else {
      // 去重合并
      store.result = [...new Set([...store.result, ...res.data.result])]
      console.log("第", store.userParams.page, "页", res.data.result)
    }
  } else {
    showNotify({ type: 'danger', message: '用户不存在' })
    show.value = false
    return false
  }
}

// await getFollowList()

// 关键字搜索
const onSearchUser = () => {
  // 判断输入框是否为空
  if (inputValue.value === null || inputValue.value === '') {
    return
  } else {
    show.value = false// 隐藏追番数据页面
    store.userParams.keyword = inputValue.value
    store.userParams.page = 1// 重置页码
    store.params.pn = 1// 重置页码
    loading.value = false// 重置加载状态
    finished.value = false// 重置加载完毕状态
    store.result = []// 重置搜索结果
    store.list = []// 重置追番数据
    getUserInfo()
  }
}

// 显示追番数据页面
const showBangumi = async (mid) => {
  console.log("点击的用户信息", mid)
  store.params.vmid = mid
  await getFollowList()
  show.value = true
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
  // 判断年月日
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
// 比较a参数是否小于等于b参数相等
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
// 将数字转换为数组,数组长度为集数
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
    return true
  }
  if (total_count == Number(new_ep_title)) {
    return true
  } else {
    return false
  }
}
// 前往哔哩哔哩番剧播放详情页
const toBilibili = (url) => {
  window.open(url)
}
// 无限加载
const onLoad = async (name) => {
  if (name === 'bangumi' && store.list.length !== 0) {
    store.params.pn++
    await getFollowList()
    loading.value = false;// 加载状态结束
    if (store.total !== 0 && store.list.length >= store.total) {
      finished.value = true;// 加载状态结束
    }
    console.log(store.list.length, store.total)
  } else if (name === 'user' && store.result.length !== 0) {
    store.userParams.page++
    await getUserInfo()
    loading.value = false;// 加载状态结束
    if (store.numResults !== 0 && store.result.length >= store.numResults) {
      finished.value = true;// 加载状态结束
    }
    console.log(store.result.length, store.numResults)
  } else {
    loading.value = false;// 加载状态结束
  }
}
</script>

<style scoped lang="less">
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
}

// 更新集数高亮颜色
.epActive {
  color: #fff !important;
  background-color: #4897ff !important;
}

.follow {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .top {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 99;

    .top__right {
      padding: 16px;
      box-sizing: border-box;
      background-color: var(--van-search-background);
      color: var(--van-nav-bar-icon-color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;

    // list形式
    .list {
      .list__item {
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
          }
        }


      }

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

    // grid形式
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 16px;
      justify-items: center;
      padding: 16px;
      box-sizing: border-box;

      .grid__item {
        position: relative;
        height: 100%;
        width: 100%;
        aspect-ratio: 3 / 4;
        overflow: hidden;
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .desc {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          background: linear-gradient(rgb(255 255 255 / 0%), rgb(0 0 0 / 70%));

          span {
            display: block;
            font-size: 14px;
            width: 100%;
            color: #fff;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            box-sizing: border-box;
          }

          span:nth-child(1) {
            font-size: 14px;
            padding: 4px 4px 0 4px;
          }

          span:nth-child(2) {
            font-size: 12px;
            padding: 4px;
          }
        }
      }
    }
  }

  .user {
    flex: 1;
    display: flex;
    flex-direction: column;

    .user__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;

      .left {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .center {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        gap: 4px;

        .name {
          color: var(--font-color-dark);
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 4px;

          .level {
            font-size: 12px;
            color: #ffffff;
            background-color: #6f9cf0;
            padding: 2px 6px;
            border-radius: 2px;
            font-weight: 700;
            text-align: center;
            box-sizing: border-box;
            transform: scale(.8);
            line-height: 1;
          }
        }

        .desc {
          font-size: 12px;
          color: var(--font-color-4);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .right {
        font-size: 16px;
      }
    }
  }
}
</style>