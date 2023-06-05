// 获取查询出来的用户列表
import { IRooteState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { getPageListData } from '@/service/main/system/system'
import { List } from '@element-plus/icons-vue/dist/types'
const systemModule: Module<ISystemState, IRooteState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.roleCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageDataList(state) {
      return (pageName: string) => {
        // 直接state[]不能获取需要转成any
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     state.userList
        //     break
        //   case 'role':
        //     state.roleList
        //     break
        // }
      }
    },
    // 查询出来的页码总数
    pageDataCount(state) {
      return (pageName: string) => {
        // 直接state[]不能获取需要转成any
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1、获取pqgeUrl   // 首字母大写去拼接
      const pageName =
        payload.pageName.slice(0, 1).toUpperCase() +
        payload.pageName.slice(1).toLowerCase()
      const pageUrl = `${payload.pageName}/list`
      // 2、对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.pageInfo)
      // 3、处理
      const { list, totalCount } = pageResult.data

      // commit('changeUserCount', totalCount)
      // commit('changeUserList', list)

      commit(`change${pageName}Count`, totalCount)
      commit(`change${pageName}List`, list)
    }
  }
}
// 导出之后需要再store/index里面进行导入，并且需要再type.ts里面进行统一注册类型和login模块类似
export default systemModule
