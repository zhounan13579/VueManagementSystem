import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
export interface IRooteState {
  name: string
  age: string
}
export interface IRootWidthModule {
  loginModule: ILoginState
  systemModule: ISystemState
}
// 交叉类型
export type IStoreType = IRooteState & IRootWidthModule
