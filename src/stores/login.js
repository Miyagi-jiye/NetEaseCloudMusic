import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  qrKey,
  qrCreate,
  qrCheck,
} from "@/api"


export const useLoginStore = defineStore('login', () => {
  /* state */
  // 二维码数据
  const QRCode = reactive({
    key: '',
    url: '',
    status: {
      code: 801,
      message: '',
      cookie: ''
    }
  })
  // 登录状态
  const isLogin = ref(false)

  /* getters */
  const test = computed(() => {
    return "test"
  })

  /* actions */
  // 获取二维码 key
  async function getQrKey() {
    const res = await qrKey()
    QRCode.key = res.unikey
    console.log('二维码key', res)
  }
  // 获取二维码 链接 和 base64图片
  async function getQrCreate() {
    const res = await qrCreate(QRCode.key)
    QRCode.url = res.qrurl
    console.log('二维码链接', res)
  }
  // 检查二维码
  async function getQrCheck() {
    const res = await qrCheck(QRCode.key)
    QRCode.status = res
    console.log('检查二维码', res)
  }


  return {
    QRCode,
    isLogin,
    getQrKey,
    getQrCreate,
    getQrCheck,
  }
})
