export const contentConfig = {
  title: '角色列表',
  // 针对userList的配置文件
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
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
  pageUrlName: 'roles'
}
