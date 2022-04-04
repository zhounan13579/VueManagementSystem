import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' //加上type代表是导入的是类型，不是函数，不是别的东西
import localCache from '@/utils/cache'
//给类型注解。 :RouteRecordRaw
const routes: RouteRecordRaw[] = [
  {
    // 默认是直接让用户跳到登录页面的，但是其实可以让用户跳转到首页，如果登录就直接跳转，如果没有登录那就调到登录页
    path: '/',
    // redirect: '/login'
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
// 导航守卫。只要不是登录，看缓存里面有没有token，有的话直接进首页
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
