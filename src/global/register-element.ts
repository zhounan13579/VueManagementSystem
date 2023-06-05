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
  ElCheckbox,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage
} from 'element-plus'

import {
  Avatar,
  Iphone,
  Setting,
  Tools,
  DArrowLeft,
  DArrowRight,
  ArrowDown,
  UserFilled,
  Edit,
  Refresh,
  Search,
  Delete
} from '@element-plus/icons-vue'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElTabPane,
  ElTabs,
  ElLink,
  ElCheckbox,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage
]

const componentsIcons = [
  Avatar,
  Iphone,
  Setting,
  Tools,
  DArrowLeft,
  DArrowRight,
  ArrowDown,
  UserFilled,
  Edit,
  Refresh,
  Search,
  Delete
]

// export function registerElement(app: App): void {
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const componentIcon of componentsIcons) {
    app.component(componentIcon.name, componentIcon)
  }
}
