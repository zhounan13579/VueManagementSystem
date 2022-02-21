import type { App } from 'vue'
import 'element-plus/dist/index.css'
import { ElButton, ElForm, ElInput } from 'element-plus'
const components = [ElButton, ElForm, ElInput]

// export function registerElement(app: App): void {
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
