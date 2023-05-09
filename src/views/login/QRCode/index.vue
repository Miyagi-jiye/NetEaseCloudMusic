<template>
  <div class="QRCode">
    <div class="top" @click="$router.back()">
      <van-icon name="arrow-left" size="23" />
      <span>二维码登录</span>
    </div>
    <div class="content">
      <qrcode-vue :value="QRCode.url" :size="size" level="H" />
      <span v-if="!QRCode.status.message">加载中...</span>
      <span v-else>{{ QRCode.status.message }}</span>
      <van-button :loading="loading" loading-type="spinner" loading-size="16px" color="#F9343D" @click="refreshQRCode">
        <span style="font-size:14px">刷新二维码</span>
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import QrcodeVue from 'qrcode.vue'// 引入二维码组件(https://github.com/scopewu/qrcode.vue/blob/HEAD/README-zh_cn.md)
import { showNotify } from 'vant';
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'


let size = ref(200)//二维码画布大小
let timer = null// 轮询定时器
let loading = ref(false)//按钮加载动画
const router = useRouter()
const { isLogin } = storeToRefs(useLoginStore())//登录状态
const { QRCode, getQrKey, getQrCreate, getQrCheck } = useLoginStore()


// 初始执行
async function init() {
  await getQrKey()
  await getQrCreate()
  polling()// 轮询检测二维码状态
}
// 轮询
function polling() {
  // 设置定时器
  timer = setInterval(async () => {
    // 检测扫码状态
    await getQrCheck()
    // 状态码匹配
    switch (QRCode.status.code) {
      case 800:
        console.log("二维码过期")
        refreshQRCode()//刷新二维码
        break;
      case 801:
        console.log("等待扫码")
        break;
      case 802:
        console.log("待确认")
        break;
      case 803:
        console.log("登录成功")
        clearInterval(timer)// 清除定时器
        isLogin.value = true//改变登录状态
        showNotify({ type: 'success', message: '登录成功' });
        // 跳转到首页
        router.push({ name: 'home' })
        break;
      default:
        console.log("状态码错误", QRCode.status.code)
        break
    }
  }, 1000)
}
// 刷新二维码
function refreshQRCode() {
  loading.value = true//开始加载动画
  if (timer !== null) clearInterval(timer)// 清除定时器
  setTimeout(() => {
    loading.value = false//1s后结束加载动画
    init()// 重新获取
    showNotify({
      message: '刷新成功',
      color: '#ffffff',
      background: '#F9343D',
      position: 'top',
      duration: 2000,
    });
  }, 1000)
}

init()

// 离开页面时清除定时器
onUnmounted(() => {
  console.log("离开扫码登录页")
  clearInterval(timer)
})
</script>

<style scoped lang="less">
.QRCode {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top {
    height: 46px;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 16px;
    font-weight: bold;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex: 1;

    span {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .refresh {
      font-size: 14px;
      color: #ffffff;
      background-color: #F9343D;
      border-radius: 20px;
      padding: 4px 12px;
      cursor: pointer;

      &:hover {
        background-color: #a50000
      }
    }
  }
}
</style>