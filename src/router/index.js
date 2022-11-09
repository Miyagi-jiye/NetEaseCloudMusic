import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/discover',
      children: [
        {
          path: '/discover',
          name: 'discover',
          component: () => import('@/views/discover/index.vue')
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('@/views/follow/test.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/songListDetail',//vue-router 4.0,name+params形式传参需要添加冒号声明参数
          name: 'songListDetail',
          component: () => import('@/views/songListDetail/index.vue')
        },
      ]
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      children: [
        {
          path: '/login/phone',
          name: 'phone',
          component: () => import('@/views/login/phone/index.vue')
        },
        {
          path: '/login/password',
          name: 'password',
          component: () => import('@/views/login/password/index.vue')
        },
        {
          path: 'QRCode',
          name: 'QRCode',
          component: () => import('@/views/login/QRCode/index.vue')
        },
      ]
    },
    // 404页
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/notFound/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
