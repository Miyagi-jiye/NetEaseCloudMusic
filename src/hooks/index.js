import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

// 存取cookie
export const useCookie = (cookie) => {
  const myCookie = ref(JSON.parse(localStorage.getItem('cookie')) || false)
  // 判断是否有传cookie过来，有的话就存入localStorage，更新myCookie
  if (cookie) {
    myCookie.value = cookie
    localStorage.setItem('cookie', JSON.stringify(cookie))
  }
  // console.log('cookie钩子', myCookie)
  return myCookie
}

// 是否隐藏header和footer
export const useHideHeaderFooter = () => {
  const hideHeaderFooter = ref(false)
  const route = useRoute()
  // 定义要隐藏的路由name
  const hideRoutes = ['search', 'songListDetail']
  // 判断路由是否为要隐藏的页面
  if (hideRoutes.includes(route.name)) {
    hideHeaderFooter.value = true
  } else {
    hideHeaderFooter.value = false
  }
  // 监听路由变化
  watch(route, (newRoute) => {
    if (hideRoutes.includes(newRoute.name)) {
      hideHeaderFooter.value = true
    } else {
      hideHeaderFooter.value = false
    }
  })
  console.log('路由钩子', route.name)
  return hideHeaderFooter
}
