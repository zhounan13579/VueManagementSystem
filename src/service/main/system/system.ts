import hyRequest from '@/service'
import { IDataType } from './../../type'

export function getPageListData(url: string, queryInfo: any): any {
  // post请求
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
