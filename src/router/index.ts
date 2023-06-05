import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' //加上type代表是导入的是类型，不是函数，不是别的东西
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menu'
//给类型注解。 :RouteRecordRaw
const routes: RouteRecordRaw[] = [
  {
    // 默认是直接让用户跳到登录页面的，但是其实可以让用户跳转到首页，如果登录就直接跳转，如果没有登录那就调到登录页
    // 如果进到首页，直接重定向到main页面
    path: '/',
    // redirect: '/login'
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children:[]--->是由usersMenu来决定的--->是children
  },
  {
    //  如果输入了一个没有注册路由的路径，多了一个星号会把route.params里面的东西分割成字符串放到数组里面。前面讲过星号是什么意思
    path: '/:pathMath(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
// 导航守卫。只要不是登录，看缓存里面有没有token，有的话直接进首页。导航守卫：页面进行跳转之前会来到这里
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // console.log(router.getRoutes())
  // console.log(to) //to是route的一个对象，是即将要跳转到的对象 此时打印出来的name是notfound，那么匹配到上面的就是notfound组件
  // 做跳转到首页第一个菜单第一个子菜单
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
