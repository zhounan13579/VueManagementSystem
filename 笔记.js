/*
第一天

使用commitizen的工具

提交代码规范。
npx cz

npm install vue-router@next  是安装路由最新版本
安装Vuex
npm install vuex@next




第二天

powsershell是windows内置的终端
cmd是一个终端。
如果是Windows电脑，默认的vscode拿的是powershell。
如果出现问题可以去cmd。可以去vscode打开终端配置成cmd。自己去搜索。

用的git bash比较好。
gitforwindows.org

npx husky-init '&&' npm install如果不识别就加上单引号

formatsave 保存的时候就自动格式化。

cmd shift p 打开配置

移动端 vantui
桌面端 element-plus 组件库。里面封装好了很多组件，我们直接引用使用即可。

集成element-plus npm install element-plus
1、全局引用。所有的组件都引入。打包的时候都打包，包会比较大。
2、按需引用。包会小，引用麻烦。

npm install babel-plugin-import -D。babel的一个插件，帮助我们进行按需引入。
然后去babel.config.js里面进行配置。配置代码去官网copy。

ajax i/O system

根据不同的环境设置不同的环境变量：开发环境development 生产环境 production 测试环境test

如何区分环境变量的三种方式
手动修改不同的变量
根据process.env.NODE_ENV的值进行区分
编写不同的环境变量配置文件




建立.prettierrc文件,运行时编译，会读取这个文件。

安装commitizen可以自动生成提交信息

测试安装git


npx cz指的是执行node_modules./bin/cz命令

提交代码时候报错no test specified。可以再测试一下为什么

在package.json里面修改脚本。npx cz就变成了 npm run commit

 */
