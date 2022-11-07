import { useLoginStore } from '@/stores/login.js'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// // 判断是否登录,并且可直接修改登录状态
// export const useLogin = (loginStatus, cookie) => {
//   // 先判断是否存有登录状态(localStorage)
//   const isLogin = ref(localStorage.getItem('isLogin') || false)
//   // 判断是否有cookie
//   const isCookie = ref(localStorage.getItem('cookie') || false)
//   // 是否传参
//   if (loginStatus) {
//     isLogin.value = loginStatus
//     localStorage.setItem('isLogin', loginStatus)
//   }
//   if (cookie) {
//     isCookie.value = cookie
//     localStorage.setItem('cookie', cookie)
//   }
//   return isLogin
// }

export const { isLogin } = storeToRefs(useLoginStore())//登录状态

export const { uid } = storeToRefs(useUserStore())//用户id
