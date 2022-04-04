import axios from 'axios'
// 导入的这个内容，就是一个实例，其实这个axios是一个实例对象就有属性和方法。

// 1、模拟get请求 这些是最基本的请求
/* axios.get('http://123.207.32.32:8000/home/multidata').then((res:AxiosResponse<any>) => {
  console.log(res)
  console.log(res) //拿到的数据正好就是AxiosResponse类型
}) //可以看到axios.get返回值是一个promise */
/*
promise本身是有类型的。
new Promise<string>((resolve,reject)=>{ 告诉别人里面必须传入一个string类型。类 new出来是可以跟上一个泛型的。还可以决定res的类型。
  resolve('123')
}.then((res)=>{})

*/

// 4、4.1 全局配置axios的基本配置选项 这些都是全局的配置。
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers={}//所有请求默认都有这个headers
//超时时间，如果超过这个时间没有响应就被认为是超时了。

// 2、get请求发送参数
axios
  .get('/get', {
    params: {
      name: 'cc',
      age: 23
    },
    timeout: 10000 //4 4.2配置单独的配置
  })
  .then((res) => {
    console.log(res.data)
  })

// 3、post请求
axios
  .post('/post', {
    data: {
      name: 'ccc',
      age: 222
    }
  })
  .then((res) => {
    console.log(res.data)
  })
// 额外补充 promise本身是有类型的。
// new Promise<string>((resolve) => {
//   //这里面的<string>可以决定后面的参数。决定then的类型res的类型。
//   resolve('123')
// }).then((res) => {
//   console.log(res.length)
// })

// 5、axios.all()多个请求一起返回 内部其实用的是promise.all
/* axios
  .all([
    axios.get('/get', { params: { name: 'c', age: 19 } }),
    axios.get('/post', { data: { name: 'c', age: 19 } })
  ])
  .then((res) => {
    console.log('------+++++++++++')
    console.log(res)
    // res是一个数组。res[0]是第一个请求的结果。 要拿到真实数据就res[0].data
  }) */

// 6、axios的拦截器
/*
1、例如每个请求里面都有token，可以在请求之前把token放到header里面。header[token]=token。
2、请求时间比较长，有一个loading的提示，请求到数据之前显示，请求到之后不显示。
fn1:请求发送成功会执行的函数 数据响应成功 服务器正常返回数据 例如200
fn2:请求发送失败会执行的函数
*/
/*
axios既然是一个实例，里面有一个属性interceptors.request拦截请求，response拦截响应。.use表示使用拦截器。
axios.interceptors.request.use(fn1,fn2);
axios.interceptors.response.use(fn1,fn2);
fn1:请求发送成功会执行的函数
fn2:请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // config就是一些配置。例如上面的axios.get('/get', {params: {name: 'cc',age: 23},timeout: 10000 置 })
    // 把config给你，你拦截到之后去执行一些操作，然后再返回出去。例如config.url='/post'，一般不会这样改，但是
    // 想要执行的一些操作，例如：1、header里面添加token。2、添加isloading动画
    console.log('成功的拦截+++++++')
    return config
  },
  (err) => {
    // 第二个fn2函数很少用到
        console.log('请求发送错误-------')

    return err
  }
)
// fn1:数据响应成功（服务器正常的返回了数据 2开头的状态）
// fn2:数据响应失败
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res.data //上面的res[0].data就不用写data了。
  },
  (err) => {
    console.log('响应失败的拦截')
    return err
    // 这里一般是4开头的错误
  }
) */
