import axios from 'axios'
// 其实这个axios是一个实例对象

// 1、这些是最基本的请求 模拟get请求
/* axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
  console.log(res) //拿到的数据正好就是AxiosResponse类型
}) //可以看到返回值是一个promise */

// 4、axios的基本配置选项 这些都是全局的配置。
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
    timeout: 10000 //配置单独的配置
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
/* 例如每个请求里面都有token，可以把token放到header里面。header[token]=token。请求时间比较长，有一个loading的提示
fn1:请求发送成功会执行的函数 数据响应成功 服务器正常返回数据 例如200
fn2:请求发送失败会执行的函数
*/
/* axios.interceptors.request.use(
  (config) => {
    // 想要执行的一些操作：header里面添加token。添加isloading动画
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
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
