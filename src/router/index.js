import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });// 进度条配置

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页(需要头部和底部的页面)
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/discover',
      children: [
        {
          path: '/discover',
          name: 'discover',
          component: () => import('@/views/discover/index.vue'),
          meta: {
            title: '发现页',
            keepAlive: true
          }
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('@/views/follow/index.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            keepAlive: true
          }
        },
        // 歌单详情
        {
          path: '/songListDetail',//vue-router 4.0,name+params形式传参需要添加冒号声明参数
          name: 'songListDetail',
          component: () => import('@/views/songListDetail/index.vue')
        },
        // 专辑详情
        {
          path: '/albumListDetail',//vue-router 4.0,name+params形式传参需要添加冒号声明参数
          name: 'albumListDetail',
          component: () => import('@/views/albumListDetail/index.vue')
        },
        // mv详情
        {
          path: '/mvListDetail',//vue-router 4.0,name+params形式传参需要添加冒号声明参数
          name: 'mvListDetail',
          component: () => import('@/views/mvListDetail/index.vue')
        },
        // 歌手详情
        {
          path: '/artistListDetail',//vue-router 4.0,name+params形式传参需要添加冒号声明参数
          name: 'artistListDetail',
          component: () => import('@/views/artistListDetail/index.vue')
        }, 
        // 搜索
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/search/index.vue'),
        }
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
