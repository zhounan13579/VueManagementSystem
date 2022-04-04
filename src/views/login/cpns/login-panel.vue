<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs
      type="border-card"
      class="demo-tabs"
      :stretch="true"
      v-model="currentTab"
    >
      <el-tab-pane name="account">
        <!-- 自定义插槽 -->
        <template #label>
          <span>
            <el-icon><Avatar /></el-icon>账号登录
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码？</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 这个泛型是对里面接收的类型进行限制的。这个string也可以省略，例如下面的isKeepPassword，但是如果什么都不传的话ref(),默认是any类型。
    const named = ref<string>('name')
    // 默认是不需要记住密码的
    const isKeepPassword = ref(true)
    const currentTab = ref<string>('account')
    // 这里是通过ref绑定到了LoginAccount组件
    // 语法： type Bar=InstanceType<typeof LoginAccount>,意思就是根据LoginAccount这个描述对象先拿到类型，然后再根据InstanceType拿到拥有构造函数的实例。此时就可以通过这个实例拿到实例里面的方法和属性。
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const handleLoginClick = () => {
      if (currentTab.value == 'account') {
        // 可选链value有值调用这个函数，value没有就不调用
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('电话号码登录')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      named,
      currentTab,
      handleLoginClick
    }
  }
})
</script>
<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-top: 120px;
  .title {
    text-align: center;
  }
  .el-icon {
    margin-right: 10px;
    vertical-align: middle;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
