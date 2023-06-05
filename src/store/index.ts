// 起别名
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRooteState, IStoreType } from './type'
import loginModule from './login/login'
import systemModule from './main/system/system'
// createStore后面可以传入泛型的。
const store = createStore<IRooteState>({
  state() {
    return {
      name: 'zn',
      age: '18'
    }
  },
  modules: {
    loginModule,
    systemModule
  },
  mutations: {},
  getters: {},
  actions: {}
})

// 表示要对store里面的内容进行初始化。每次进来
export function setupStore() {
  // login模块里面的loadLocalLogin这个action
  store.dispatch('loginModule/loadLocalLogin')
}
// 返回的store是一个any类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
