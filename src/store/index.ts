import { createStore } from 'vuex'
import { IRooteState } from './type'
import loginModule from './login/login'
// import login from './login/login'
// createStore后面可以传入泛型的。
const store = createStore<IRooteState>({
  state: () => {
    return {
      name: '',
      password: ''
    }
  },
  modules: {
    loginModule
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

export default store
