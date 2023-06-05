const path = require('path')
// 如果提示错误，但是实际上真的没有错误，可以悬浮、复制、到eslintrc.js、粘贴、off。
module.exports = {
  /* 1、配置方式一：是CLI提供的属性 */
  // outputDir:""打包后的文件放到哪一个文件夹里面。这个vue.config.js的配置可以去官网里面去看。
  outputDir: './build', //输出文件夹，默认是dist
  // publicPath: './', //修改的是默认路径
  devServer: {
    proxy: {
      '^/api': {
        // 映射到URL。 代理服务器的地址http://152.136.185.210:5000。之后就需要在将开发环境的URL修改成/api
        target: 'http://111.230.245.205:8880',
        pathRewrite: {
          '^/api': ''
        },
        //找到target地址放到header里面。表示是否更新代理后请求的headers中host地址。
        changeOrigin: true
      }
    }
  },
  /* 2、配置方式二：和webpack属性完全一致，最后会合并。 */
  configureWebpack: {
    //这个属性对应的是一个对象，最后会被合并到webpack里面的。
    resolve: {
      //配置路径
      alias: {
        //配置别名
        components: '@/component' //默认情况下@对应的是src。所以这个的意思就是src/component
      }
    }
  }
  // 相当于把config给我们，我们去修改这个config配置。
  // configureWebpack:(config)=>{
  //   // 相当于把之前的给覆盖掉了。所以需要重新写。
  //   config.resolve.alias={
  //     '@':path.resolve(__dirname,'src'),//根路径下的src下的。
  //     component:'@/component'
  //   }
  // }
  /* 3、配置方式三：是一个函数， */
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('component', '@/component') //还可以继续往后面添加内容
  //     .set('assets', '@/assets')
  //     .set('views', '@/views')
  // }
}
