<template>
  <div class="app">
    <!-- <router-link to="/main">首页</router-link>
    <router-link to="/login">登录</router-link> -->
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 为了国际化英语为汉语
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: '',
  components: { ElConfigProvider },
  props: {
    msg: String
  },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
  width: 100%;
}
</style>
