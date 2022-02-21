// 这里是局部导入的入口
import type { App } from 'vue'
// import { registerElement } from './register-element'
import registerElement from './register-element'

export function globalRegister(app: App): void {
  // registerElement(app)
  // 也可以这样写
  app.use(registerElement)
}
