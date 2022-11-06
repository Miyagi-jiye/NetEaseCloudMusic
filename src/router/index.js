import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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
      ]
    },
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
