import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  qrKey,
  qrCreate,
  qrCheck,
  loginByCaptcha,
  loginByPhone,
  sendCaptcha,
} from "@/api"


export const useLoginStore = defineStore(
  'login',
  () => {
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
    // 验证码登录数据
    const captchaLogin = reactive({
      phone: '',// 手机号码
      captcha: '',// 验证码
    })
    // 密码登陆数据
    const passwordLogin = reactive({
      phone: '',// 手机号码
      password: '',// 密码
    })
    // 登录状态
    const isLogin = ref(false)
    // 勾选协议
    const isChecked = ref(false)
    // cookie
    const cookie = ref('')

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
      cookie.value = res.cookie// 更新cookie
      console.log('检查二维码', res)
      return res
    }
    // 发送验证码
    async function getSendCaptcha() {
      const res = await sendCaptcha(captchaLogin.phone)
      console.log('发送验证码', res)
      return res
    }
    // 验证码登录
    async function getLoginByCaptcha() {
      const res = await loginByCaptcha(captchaLogin.phone, captchaLogin.captcha)
      cookie.value = res.cookie// 更新cookie
      console.log('验证码登录', res)
      return res
    }
    // 密码登录
    async function getLoginByPassword() {
      const res = await loginByPhone(passwordLogin.phone, passwordLogin.password)
      cookie.value = res.cookie// 更新cookie
      console.log('密码登录', res)
      return res
    }

    return {
      QRCode,
      captchaLogin,
      passwordLogin,
      isLogin,
      isChecked,
      cookie,
      getQrKey,
      getQrCreate,
      getQrCheck,
      getSendCaptcha,
      getLoginByCaptcha,
      getLoginByPassword,
    }
  },
  {
    // 全部数据持久化
    // persist: true,
    // 自己配置
    persist: {
      // key: 'storekey',
      // storage: window.sessionStorage,
      paths: ['isLogin', 'cookie'],//选择你要存储的数据 
    }
  }
)
