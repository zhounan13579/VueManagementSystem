export const contentConfig = {
  title: '菜单列表',
  // 针对userList的配置文件
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url ', minWidth: '100' },
    // slotName 给自定义插槽定义内容在使用table的父组件里面
    {
      prop: 'icon',
      label: '菜单icon ',
      minWidth: '100'
    },
    {
      prop: 'persimmon',
      label: '按钮权限 ',
      minWidth: '100'
    },

    // 有的有slotName，有的没有，是为了可以自定义是否存在插槽。
    {
      prop: 'createAt',
      label: '创建时间 ',
      minWidth: '220',
      slotName: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间 ',
      minWidth: '220',
      slotName: 'updateTime'
    },
    {
      label: '操作 ',
      minWidth: '180',
      slotName: 'handle'
    }
  ],
  pageUrlName: 'goods',
  showIndexColunm: false,
  showSelectColumn: false,
  // 针对children是否要展开
  // 这些属性需要传递给table，让table去接收
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  // 先在table.vue设置showFooter默认展示，然后再这个文件里面设置在menu.vue里面是否展示
  showFooter: false
}
