import { useLoginStore } from '@/stores/login.js'
import { storeToRefs } from 'pinia'

// 判断是否登录,并且可直接修改登录状态
export const { isLogin } = storeToRefs(useLoginStore())//登录状态
