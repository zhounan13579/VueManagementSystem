// 编写规则
export const rules = {
  number: [
    {
      // 必须传递
      require: true,
      message: '用户名必填',
      // 什么时候会触发规则：blur失去焦点，change
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字'
    }
  ],
  code: [
    {
      // 必须传递
      require: true,
      message: '密码必填',
      // 什么时候会触发规则：blur失去焦点，change
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上字母或者数字'
    }
  ]
}
