<template>
  <div>
    <h2>{{ this.$store.state.name }}</h2>
    <h2>{{ $store.state.name }}</h2>
    <router-link to="/main">首页</router-link>
    <router-link to="/login">登录</router-link>
    <router-view></router-view>
    <el-button type="primary">这是el的按钮</el-button>
    <button>好臭啊艹</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '',
  props: {
    msg: String
  }
})
</script>

<style lang="less"></style>
