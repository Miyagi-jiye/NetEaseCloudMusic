<template>
  <div class="about" v-if="res">
    <div class="setting">
      <span>最近100条记录</span>
      <van-icon v-show="show == true" name="descending" size="26" @click="reverse()" />
      <van-icon v-show="show == false" name="ascending" size="26" @click="reverse()" />
    </div>
    <div class="dynamic" v-for="(item, index) in res" :key="item.id">
      <div class="left">
        <img :src="item.actor.avatar_url" :alt="item.actor.id">
      </div>
      <div class="right">
        <div class="dynamic__top">
          <div class="name">
            <span>{{ item.actor.name }}</span>
            <span>{{ item.type }}</span>
            <a :href="item.actor.html_url" target="_blank">
              <svg t="1669984047339" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4511" width="14" height="14">
                <path
                  d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"
                  fill="#C71D23" p-id="4512"></path>
              </svg>
            </a>
          </div>
          <div class="time">
            {{ compareTime(item.created_at) }}
          </div>
        </div>
        <div class="dynamic__bottom" v-if="item.payload.commits">
          {{ item.payload.commits[0].message }}
        </div>
      </div>
      <div class="badge" v-show="(isShowBadge(item.created_at) == true)">New</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from 'vue'

const res = ref([])// 用于存储请求的数据
const show = ref(false)// 用于控制排序图标的显示
// 简易封装fetch请求
async function getData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc. // 请求方式
    mode: 'cors',// 跨域模式
    cache: 'no-cache',// 不缓存
    credentials: 'same-origin',// 跨域模式下是否发送cookie
    headers: {
      'Content-Type': 'application/json'
    },// 设置请求头
    redirect: 'follow', // manual, *follow, error // 跟随重定向
    referrerPolicy: 'no-referrer',// no-referrer, *client // 设置请求头中的referer
    // body: JSON.stringify(data)// body数据类型必须为string或者FormData
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// 列出仓库的所有动态
// GET https://gitee.com/api/v5/repos/{owner}/{repo}/events
// 必选参数：
// access_token：通过OAuth授权获得的access_token (a695a49a95f8eab098ea0446068d4457)
// owner：仓库所属空间地址(企业、组织或个人的地址path),
// repo：仓库路径(path)
// 可选参数：
// limit：每页的动态数量，默认为20,最大为100
// prev_id：上一页最后一条动态的id，用于获取下一页动态
const owner = 'miyagi-jiye'
const repo = 'net-ease-cloud-music'
const access_token = 'af7f83ea3dcd99c1a7cab7b454e3d215'
const limit = 100
const prev_id = 0
const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/events?access_token=${access_token}&limit=${limit}`

res.value = await getData(url)
console.log("gitee仓库动态", res.value)

// 点击倒序
function reverse() {
  res.value.reverse()
  show.value = !show.value
}
// 格式化时间
function formatDate(time) {
  let date = new Date(time)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let year = date.getFullYear()//年
  let month = date.getMonth() + 1//月
  let day = date.getDate()//日
  let hour = date.getHours()//时
  let minute = date.getMinutes()//分
  let second = date.getSeconds()//秒
  // 判断是否小于10，小于10则在前面补0
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  // 拼接
  let timeStr = year + '年' + month + '月' + day + '日  ' + hour + ':' + minute + ':' + second
  return timeStr
}
// 比较时间大小，如果距离今天不超过一天，则显示几小时前（精确到秒），否则显示具体时间
function compareTime(time) {
  let date = new Date(time)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let now = new Date()
  let diff = now.getTime() - date.getTime()
  if (diff < 24 * 60 * 60 * 1000) {
    let hour = Math.floor(diff / (60 * 60 * 1000))
    let minute = Math.floor(diff / (60 * 1000))
    let second = Math.floor(diff / 1000)
    if (hour > 0) {
      return hour + '小时前'
    } else if (minute > 0) {
      return minute + '分钟前'
    } else {
      return second + '秒前'
    }
  } else {
    return formatDate(time)
  }
}
// 判断是否显示new徽标
function isShowBadge(time) {
  let date = new Date(time)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let now = new Date()
  let diff = now.getTime() - date.getTime()
  if (diff < 24 * 60 * 60 * 1000) {
    return true
  } else {
    return false
  }
}

onActivated(() => {
  console.log('activated')
})
onDeactivated(() => {
  console.log('deactivated')
})
</script>

<script>
export default { name: 'about' }
</script>

<style scoped lang="less">
.about {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
  width: 100%;
  color: var(--font-color-dark);
}

.dynamic {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  // border: 1px solid;
  border-radius: 8px;
  background: var(--card-background-color);
  color: var(--font-color-dark);
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;
  position: relative;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #999;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: hidden;
  }

  .badge {
    position: absolute;
    right: 8px;
    top: -8px;
    font-size: 16px;
    font-weight: bold;
    color: red;
  }

  .dynamic__top {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      margin-right: 8px;
    }

    .time {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: #999;
    }

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;

      span:first-child {
        font-size: 16px;
      }

      span:nth-child(2) {
        color: #1890ff;
        font-size: 16px;
      }

      span:nth-child(3) {
        color: #999;
      }
    }
  }

  .dynamic__bottom {
    white-space: break-spaces;
    line-height: 1.5;
    font-size: 16px;
  }
}
</style>