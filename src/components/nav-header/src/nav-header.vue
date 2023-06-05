<template>
  <div class="nav-header">
    <el-icon v-show="isFold === false" class="fold" @click="handleFoldClick"
      ><d-arrow-right
    /></el-icon>
    <el-icon class="fold" v-show="isFold === true" @click="handleFoldClick"
      ><d-arrow-left
    /></el-icon>
    <div class="content">
      <hy-bread-crumb :breadcrumbs="breadcrumbs"></hy-bread-crumb>
      <HyBreadCrumb :breadcrumb="breadcrumbs" />
      <div class="user-info">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import HyBreadCrumb from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menu'
export default defineComponent({
  components: {
    UserInfo,
    HyBreadCrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 默认情况下是不折叠的
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 面包屑数据
    // 拿到userMenus
    const store = useStore()
    // const userMenus = store.state.login.userMenus
    // // 拿到当前路径
    // const route = useRoute()
    // const current = route.path
    // 因为点击左侧菜单跳转页面的时候，面包屑的一级没有刷新，所以需要用computed来实时更新
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      // 拿到当前路径
      const route = useRoute()
      const current = route.path
      return pathMapBreadcrumbs(userMenus, current)
    })
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 3;
    padding: 0 20px;
  }
}
</style>
