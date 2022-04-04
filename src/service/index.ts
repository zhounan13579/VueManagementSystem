// 作为service统一的出口。
import { BASE_URL, TIME_OUT } from './request/config'
import HYRequest from './request'

import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // headers: Headers,
  // hooks:{}里面对应的是一个一个的拦截器
  // 这个是自己传递的拦截器。每个实例可以有自己不同的拦截器。相同的拦截器没必要传递，那么就可以可选。
  interceptors: {
    requestInterceptor: (config) => {
      // console.log(config)
      // // 举例1：携带token的拦截。例如给每个BASE_URL都添加token
      const token = localCache.getCache('token')
      if (token) {
        // token一般都是放到请求头里面.Authorization授权的意思。Bearer信使信差
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

// 在这里导出之后，需要再main.ts里面导入。这里导出的是封装后的一个实例。
export default hyRequest
