import type { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElButton,
  ElForm,
  ElInput,
  ElIcon,
  ElTabPane,
  ElTabs,
  ElFormItem,
  ElLink,
  ElCheckbox
} from 'element-plus'

import { Avatar, Iphone } from '@element-plus/icons-vue'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElTabPane,
  ElTabs,
  ElLink,
  ElCheckbox
]

const componentsIcons = [Avatar, Iphone]

// export function registerElement(app: App): void {
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const componentIcon of componentsIcons) {
    app.component(componentIcon.name, componentIcon)
  }
}
