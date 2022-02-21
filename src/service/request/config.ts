// 1、手动切换不同的方式
// 2、根据process.env.NODE_ENV
// 开发环境development 生产环境 production 测试环境test
let BASE_URL: string
let TIME_OUT: number
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000'
  TIME_OUT = 10000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000'
  TIME_OUT = 10000
} else {
  BASE_URL = 'http://123.207.32.32:8000'
  TIME_OUT = 10000
}
export { BASE_URL, TIME_OUT }
// es6只能先定义然后放到{}里面。或者直接在定义的时候导出。{}其实不是对象是ESModule里面的一个特殊语法。
// 3、根据vue-cli 创建.env 在里面写一些环境变量
