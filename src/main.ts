import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { globalRegister } from './global'
import { setupStore } from './store/index'
import 'normalize.css'
import '@/assets/css/index.less'

// 按需导入一些组件
// 这里是全局导入。
/* import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus) */

const app = createApp(App)
// globalRegister(app)//因为执行这个方法 的时候Vue自动传入了app。所以我们可以这样写 Vue3插件的时候讲过。什么自动执行install什么的。
// 注册element-plus
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')
setupStore()
// 可以在shims-vue.d.ts里面进行声明。
// console.log(process.env.NODE_ENV)
// console.log(process.env.VUE_APP_BASE_URL)

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'get',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (config) => {
//       console.log('单独响应的config')
//       return config
//     }
//   }
// })
interface DataType {
  data: any
  returnCode: string
  success: boolean
}
// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'get',
//     showLoading: true
//     // interceptors: {
//     //   requestInterceptor: (config) => {
//     //     console.log('单独请求的config')
//     //     return config
//     //   },
//     //   responseInterceptor: (config) => {
//     //     console.log('单独响应的config')
//     //     return config
//     //   }
//     // }
//   })
//   .then((res) => {
//     // console.log(res.data)
//     // console.log(res.success)
//     // console.log(res.returnCode)
//   })
// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res)
//   })
