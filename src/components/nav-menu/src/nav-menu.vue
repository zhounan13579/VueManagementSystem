<template>
  <div class="nav-menu">
    <!-- 分两部分，上面是菜单，下面是logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">vue3+ts</span>
    </div>
    <!-- default-active=2的话，如果菜单的ID是2的话，那么默认选中高亮的就会一直是ID为2的菜单 -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <!-- index属性作为唯一标识符 -->
          <!-- 转成字符串，只要拼接一个空字符串就行了 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 具名插槽 -->
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <el-icon><tools /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <!-- <i v-if="subitem.icon" :class="subitem.icon"></i> -->
                <el-icon><setting /></el-icon>
                <el-icon> </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
// import { defineComponent } from 'vue'
import { pathMapToMenu } from '@/utils/map-menu'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const userMenus = computed(() => store.state.loginModule.userMenus)
    // router
    const router = useRouter()
    // defaultValue 此时不能写死
    // 如何判断选中的菜单ID
    // 1、拿到路径2、根据路径去匹配menu。（可以去utils，map-menus.ts文件里面）3、拿到menu.id作为default.value的值
    const route = useRoute() //是可以拿到当前路由的
    const currentPath = route.path
    // userMenus是ref对象，想取具体的值的话要用.value
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '') //转成字符串
    // 事件处理 event handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        // 查看item.url是否有值，有值的话，没有的话跳到not-found
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    // 发现右侧有一条竖线
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
