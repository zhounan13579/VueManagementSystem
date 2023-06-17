/* eslint-disable @typescript-eslint/no-explicit-any */
type IFormType = 'input' | 'select' | 'datepicker' | 'password'
export interface IFormItem {
  filed: string //对应的字段
  type: IFormType
  label: string
  // 验证规则
  // 可选类型
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any
  // 针对一些特殊的属性
  otherOptions?: any
}
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
