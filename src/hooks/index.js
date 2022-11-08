import { ref } from 'vue'

// 存取cookie
export const useCookie = (cookie) => {
  const myCookie = ref(JSON.parse(localStorage.getItem('cookie')) || false)
  // 判断是否有cookie
  if (cookie) {
    myCookie.value = cookie
    localStorage.setItem('cookie', JSON.stringify(cookie))
  }
  return myCookie
}