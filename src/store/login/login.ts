import { Module } from 'vuex'
import router from '@/router'
import { ILoginState } from './type'
import { IRooteState } from '../type'
import { IAccount } from '@/service/login/type'
import {
  accountLogin,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menu'
// 必须传入泛型的类型,这是必须传的
const loginModule: Module<ILoginState, IRooteState> = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 把userMenu映射到routes里面。当type=2的时候做映射。代码在utils/map-menus.ts里面
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)
      // 将routes添加到router/main/children里面
      // router.addRoute()是动态添加路由的
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // commit指的是上下文，可以输出
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1、实现登录逻辑
      // accountLogin().then({})返回的是一个promise这样写不太好，可以在前面写async.把当前的函数写成异步函数，里面就可以同步的去写异步的代码
      const loginResult = await accountLogin(payload)
      // console.log(loginResult)
      const { id, token } = loginResult.data
      // 拿到token以后要保存到Account里面，修改state的数据的唯一的方法就是通过mutations。
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 2、获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      // 因为以后的每个请求都要携带token，所以可以给token做一个本地保存
      commit('changeUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)
      // 3、请求用户菜单
      const userMenus = await requestUserMenusByRoleId(id)
      commit('changeUserMenus', userMenus.data)
      localCache.setCache('userMenus', userMenus.data)
      //4、跳到首页，拿到router对象，将路径改为首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  getters: {}
}
export default loginModule
