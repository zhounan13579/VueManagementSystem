import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//定义hook，就是回调，就是请求的时候做回调，就是在回调的时候会做什么事情

// 接口泛型举例如下
// interface IPerson<T> {
//   x: T
// }

// 定义接口，定义拦截器，定义类型 。如果不传值的话默认是AxiosResponse类型
export interface HYRequestInterceptors<T = AxiosResponse> {
  // requestInterceptor是一个函数类型，有一个参数叫config，config的类型是AxiosRequestConfig,返回值也是AxiosRequestConfig类型。
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 错误拦截
  requestInterceptorCatch?: (error: any) => any
  // 响应拦截
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T

  responseInterceptorCatch?: (error: any) => any
}

//继承自上面的接口。那么AxiosRequestConfig里面的属性，HYRequestConfig都有
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 对原来的AxiosRequestConfig进行扩展，扩展的类型是HYRequestInterceptors类型。可选，就是./../index.ts里面的四个拦截器可选可不选。
  interceptors?: HYRequestInterceptors<T>
  //有一个showLoading的属性，可以在实例里面决定是否显示loading，这个属性可传可不传
  showLoading?: boolean
}
