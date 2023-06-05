import hyRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from './../type'
// 枚举类型
enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UsersMenu = '/role/'
}
export interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}

export interface Department {
  id: number
  name: string
  parentId?: unknown
  createAt?: Date
  updateAt?: Date
  leader?: string
}

export interface UserInfo {
  id: number
  name: string
  realname: string
  cellphone?: number
  enable?: number
  createAt?: Date
  updateAt?: Date
  role?: Role
  department?: Department
}

// export interface UserInfo {
//   code: number˜
//   data: Data
// }

// 登录接口
export function accountLogin(account: IAccount) {
  //调用post请求要传递一个URL
  const response = hyRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
  return response
}
// 获取用户信息的接口
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}
// 获取用户菜单
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginApi.UsersMenu + id + '/menu',
    showLoading: false
  })
}
