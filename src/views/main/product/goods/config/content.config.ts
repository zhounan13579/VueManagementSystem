export const contentConfig = {
  title: '商品列表',
  // 针对userList的配置文件
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格 ', minWidth: '100' },
    // slotName 给自定义插槽定义内容在使用table的父组件里面
    {
      prop: 'imgUrl',
      label: '商品图片 ',
      minWidth: '100',
      slotname: 'imageUrl'
    },

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
  pageUrlName: 'goods'
}
