<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span>{{ name }}</span>
        <!-- <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item>退出登录</el-dropdown-item> -->
          <el-dropdown
            ><router-link to="/login">重新登录</router-link></el-dropdown
          >
          <!-- 这是个分割线 -->
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.loginModule.userInfo.name)
    return {
      name
    }
  }
})
</script>
<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
