// 定义返回登录结果的类型。写泛型，里面的类型由外界决定。如果别人没传，默认是any
export interface IDataType<T = any> {
  code: number
  data: T
}
