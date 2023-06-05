export const contentConfig = {
  title: '用户列表',
  // 针对userList的配置文件
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '电话号码 ', minWidth: '100' },
    // 有的有slotName，有的没有，是为了可以自定义是否存在插槽。
    { prop: 'enable', label: '状态 ', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间 ',
      minWidth: '180',
      slotName: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间 ',
      minWidth: '180',
      slotName: 'updateTime'
    },
    {
      label: '操作 ',
      minWidth: '180',
      slotName: 'handle'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  rechange: () => {
    // console.log('ddd')
  },
  pageUrlName: 'users'
}
