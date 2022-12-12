<template>
  <div class="bilibili">

    <div class="search">
      <div class="top">
        <van-icon name="arrow-left" size="22" @click="$router.back()" />
        <van-search v-model="inputValue" placeholder="请输入B站用户名" input-align="center" shape='round' :clearable="false"
          @keydown.enter.stop="onSearchUser" />
        <span class="searchBtn" @click="onSearchUser">搜索</span>
      </div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="showType" :options="showTypeOption" />
      </van-dropdown-menu>
    </div>

    <div v-show="show == true" class="content">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad('bangumi')">
        <MyList v-show="showType == 'list'" :data="store.list" />
        <MyCard v-show="showType == 'card'" :data="store.list" />
      </van-list>
    </div>
    <div v-show="show == false" class="user">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad('user')">
        <div class="user__item" v-for="item in store.result" :key="item.mid">
          <div class="left">
            <img :src="`https:${item.upic}@50w_50h.webp`" :alt="item.uname" referrerpolicy="no-referrer">
          </div>
          <div class="center">
            <div class="name">
              <span>{{ item.uname }}</span>
              <span class="level" :style="{ backgroundColor: getLevelColor(item.level) }">
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
import MyCard from './components/card.vue'// 卡片形式
import MyList from './components/list.vue'// 列表形式
import MyButton from './components/button.vue'// 查看按钮
import { ref, reactive } from 'vue'
import { bangumiFollowList, searchUser } from './api/index.js'
import { showNotify, showDialog } from 'vant'

const value1 = ref(0);// 0 默认排序 1 粉丝数排序 2 等级排序
const option1 = [
  { text: '默认排序', value: 0 },
  { text: '粉丝数排序', value: 1 },// fans
  { text: '等级排序', value: 2 },// level
];
const showType = ref('card')// card:卡片 list：列表
const showTypeOption = [
  { text: '列表布局', value: 'list' },
  { text: '卡片布局', value: 'card' },
];
const show = ref(false)// 是否显示追番数据
const inputValue = ref(null)
const loading = ref(false)// list无限加载是否加载中
const finished = ref(false)// list无限加载是否加载完毕
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


// 传入等级，返回等级颜色
const getLevelColor = (level) => {
  if (level == 0) {
    return '#C0C0C0'
  } else if (level == 1) {
    return '#C0C0C0'
  } else if (level == 2) {
    return '#8BD29B'
  } else if (level == 3) {
    return '#7BCDEF'
  } else if (level == 4) {
    return '#FEBB8B'
  } else if (level == 5) {
    return '#EE672A'
  } else if (level == 6) {
    return '#FF0000'
  } else {
    return '#F152F0'
  }
}
// 获取追番数据
const getFollowList = async () => {
  const res = await bangumiFollowList(store.params)
  // 判断返回值是否为空
  if (res.data && res.data.list && res.data.list.length > 0) {
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
    return true
  } else {
    showDialog({
      title: '抱歉',
      message: '该用户未开放追番查看权限'
    })
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
  store.params.vmid = mid
  const res = await getFollowList()
  if (res) show.value = true
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
:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}

:deep(.van-search) {
  width: 100%;
  height: 46px;
  flex: 1;
  padding: 0 32px;
}

:deep(.van-search__field) {
  height: 28px;
}

:deep(.van-pagination) {
  width: 100%;
}

.bilibili {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .search {
    position: sticky;
    top: 0;
    z-index: 99;

    .top {
      display: flex;
      align-items: center;
      background-color: var(--van-search-background);
      color: var(--van-nav-bar-icon-color);
      padding: 0 16px;
      box-sizing: border-box;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
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