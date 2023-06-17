/* eslint-disable @typescript-eslint/no-explicit-any */
// 在router/index.ts里面用过
import { IBreadCrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

// 为了使得进入到项目中自动重定向到第一个菜单下的第一个子菜单
let firstMenu: any = null //默认给一个空的
// 返回的是routes数组
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 再把所有数组添加到main的children里面
  // 可以定义一个空数组，然后再返回
  // 1、先去加载默认所有的routes

  const allRoutes: RouteRecordRaw[] = []
  // 第一个参数指的是webpack的工具require.context帮助加载某个文件夹，第二个参数指的是要不要进行递归的查找，第三个指的是查找以ts结尾的文件
  const routeFile = require.context('../router/main', true, /\.ts/)
  routeFile.keys().forEach((key) => {
    // 这是commonJS里面的require函数了。
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)
  // 因为有的不仅有2级菜单，也有三级菜单四级菜单，所以需要递归，不如写一个递归的方法。
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 遍历出来所有的route对象
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
        // 如果firstMenu没值的话赋值
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  // 2、根据菜单获取需要添加的routes
  return allRoutes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadCrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 判断是否为空，是的话传进去空数组就是遍历数组，不是的话
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      // 判断findMenu是否有值
      if (findMenu) {
        // 可能有值可能没有值，所以用可选链
        // 以为一级面包屑没有页面，所以不需要跳转
        // breadcrumbs?.push({ name: menu.name, path: menu.url })
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })

        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// // 当前路径映射面包屑
// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
//   const breadcrumbs: IBreadCrumb[] = []
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       // 判断是否为空，是的话传进去空数组就是遍历数组，不是的话
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       // 判断findMenu是否有值
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })

//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrumbs
// }
// // 当前路径映射左侧菜单
// // 此时的usersMenus先给我一个菜单，再给一个路径 map映射 pathMapToMenu给我一个路径我匹配到一个菜单上
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       // 判断是否为空，是的话传进去空数组就是遍历数组，不是的话
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       // 判断findMenu是否有值
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }
export { firstMenu }
