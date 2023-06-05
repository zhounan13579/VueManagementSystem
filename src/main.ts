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
setupStore()
// app.use(globalRegister)

// 点击刷新，页面会重新加载，那么就会加载一次main.ts文件，代码从上往下依次执行，执行到下面的时候重新注册了一次路由，就会执行router.install()函数，install()函数获取当前路径(main/system/user)，拿到路径之后就会去router.routes里面去匹配，此时没有动态注册的那些东西，匹配的是notfound，此时还没有去执行导航守卫，导航守卫是回调函数，是在准备执行跳转的时候才会执行的函数。往下去执行setupStore()，而setupStore是注册动态路由了，此时才有所有的路径。可以在匹配前注册好。
app.use(router)
app.use(store)
app.use(globalRegister)

app.mount('#app')
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
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
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
