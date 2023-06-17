// 对axios进行封装，只需要在这一个地方引入axios，只有这一个问价对axios有依赖。
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true
class HYRequest {
  /*
  在这里面封装get(){},post(){}方法，则在外部可以用hyRequest.get(),hyRequest.post()等。
  */

  // 通过axios创建的实例类型就是AxiosInstance。然后添加上类型注解。 interface是一个接口
  instance: AxiosInstance

  // 可以使用自己定义的类型。
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance
  // constructor构造器，可以在里面传入配置config。每次new HYRequest的时候，都会经过构造器，就会创建不同的实例，不同的实例就会保存到上面的instance里面，两个实例没有任何干扰

  // 原本是constructor里面只能传递AxiosRequestConfig规定的类型。现在可以传递HYRequestConfig这个自己定义的类型。
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    // ??前面是否是null或者undefined，如果是的话默认就是TRUE
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 拦截器
    // 将传入的拦截器保存在interceptors里面。
    this.interceptors = config.interceptors

    // 响应的时候，先添加的先响应
    //1、单个实例单独的添加拦截器 从config中取出的拦截器是对应的实例的拦截器。。详细请看./../index.ts
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      // 可选链，不一定有值
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2、所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log(config)
        // 举例3：请求之前显示loading，请求完成之后隐藏loading
        // 判断，如果请求传递了showLoading的话，那就显示。如果没有那就不显示。
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：响应失败---------------')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log(res)
        // 将loading移除。直接用可选链
        // setTimeout(() => {
        this.loading?.close()
        // }, 3000)

        // 举例2：不同的错误进行拦截
        const data = res.data
        // console.log(data)
        // if(data.returnCode&&data.returnCode)
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 例子2：判断不同的HttpErrorCode给不同的错误提示信息。给所有请求失败添加拦截。可以用switch
        if (err.response.status === 404) {
          console.log('404')
        }
        return err
      }
    )
  }

  // 在这里给类添加方法：request(),reponse()

  // 此时confi的乐行就不能是AxiosRequestConfig了，因为这个默认的不能传递任何的拦截器。。下面可以使每个请求有单独的响应和单独的拦截。
  // 用Promise是为了将数据返回出去。
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1、单个请求对config的处理

      // 查看是否有requestInterceptor这个函数，有的话就传过去。
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2、判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<unknown, T>(config)
        .then((res) => {
          // 1、单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2、将showloading设置为TRUE，不会影响下一个请求。
          this.showLoading = DEFAULT_LOADING

          // 3、将数据reslove出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

// 导出，类的特点是封装继承，封装性好。比exports function request(),exports function response()好
export default HYRequest
