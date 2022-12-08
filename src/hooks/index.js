import { ref, watch, onMounted, onUnmounted, nextTick, onUpdated } from 'vue'
import { useRoute } from 'vue-router'

// 是否隐藏header和footer
export const useHideHeaderFooter = () => {
  // 定义要隐藏的路由name
  const hideRoutes = [
    'search',
    'songListDetail',
    'albumListDetail',
    'mvListDetail',
    'artistListDetail',
    'userListDetail',
    'searchDetail',
    'recommend',
    'follow',
  ]
  const hidden = ref(false)
  const route = useRoute()
  // 判断路由是否为要隐藏的页面
  if (hideRoutes.includes(route.name)) {
    hidden.value = true
  } else {
    hidden.value = false
  }
  // 监听路由变化
  watch(route, (newRoute) => {
    if (hideRoutes.includes(newRoute.name)) {
      hidden.value = true
    } else {
      hidden.value = false
    }
  })
  return hidden// 返回是否隐藏的响应式状态
}
