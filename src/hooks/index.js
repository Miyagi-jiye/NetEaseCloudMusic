import { ref, watch, onMounted, onUnmounted, nextTick, onUpdated } from 'vue'
import { useRoute } from 'vue-router'

// 是否隐藏header和footer
export const useHideHeaderFooter = () => {
  const hideHeaderFooter = ref(false)
  const route = useRoute()
  // 定义要隐藏的路由name
  const hideRoutes = ['search', 'songListDetail', 'albumListDetail', 'mvListDetail', 'artistListDetail', 'userListDetail', 'searchDetail']
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
  return hideHeaderFooter
}
