// 如何区分环境变量
// 1、手动切换不同的方式 const BASE_URL:string="http://121.37.196.89:8880"，不同的环境下手动修改
// 2、根据process.env.NODE_ENV，这个在不同的环境下有不同的值。
// 开发环境development 生产环境 production 测试环境test
let BASE_URL: string
let TIME_OUT: number
let Headers: string
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  // TIME_OUT = 10000
} else if (process.env.NODE_ENV === 'production') {
  console.log('生产环境')
  BASE_URL = 'http://123.207.32.32:5000'
  // TIME_OUT = 10000
} else {
  BASE_URL = 'http://123.207.32.32:5000'
  // TIME_OUT = 10000
}
export { BASE_URL, TIME_OUT, Headers }
// es6只能先定义然后放到{}里面。或者直接在定义的时候导出。{}其实不是对象是ESModule里面的一个特殊语法。
// 3、根据vue-cli在根目录下去创建.env文件，在里面写一些环境变量，里面的内容会自动读取自动注入。.env是在任意环境里面都会注入。可以根据不同环境注入不同的内容。VUE_APP_后面跟自定义的东西，如果报错的话就在src目录下的.shims-vue.d.ts末端进行声明declare const VUE_APP_BASE_URL: string。访问的时候就要通过process.env.VUE_APP_了。此时如果liveserve一下build文件夹下打包好的index.html文件，会发现访问不到，需要修改路径问./就是修改成了当前路径。也可以到vue.config.js里面添加publicpath:'./'，部署到服务器的时候不要修改这个。
