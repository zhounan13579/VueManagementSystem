<template>
  <div class="login-account">
    <!-- 永远把account最新的值给el-form -->
    <el-form :rules="rules" :model="account" ref="formRef">
      <!-- prop指的是验证规则 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="coderwhy"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          show-password
          placeholder="123456"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import { useStore } from '@/store'
import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()

    // props里面的内容最好只用不改
    // const account = reactive({
    //   // 如果是空的话就给一个空字符串
    //   name: localCache.getCache('name') ?? '',
    //   password: localCache.getCache('password') ?? ''
    // })
    const account = { name: 'coderwhy', password: '123456' }
    // 传入泛型 传入的是ElForm的类型，所以要在上面导入ElForm的类型。
    const formRef = ref<InstanceType<typeof ElForm>>()
    // isKeepPassword是从login-panel接收的。
    const loginAction = (isKeepPassword: boolean) => {
      // formRef.value就是组件对象
      formRef.value?.validate((valid) => {
        // validate是验证的意思，验证之后会有一个回调，验证通过valid是TRUE，否则是FALSE。这个验证通过指的是是否输入正确格式的账号和密码。
        if (valid) {
          // 1、判断是否需要记住密码
          if (isKeepPassword) {
            // 做一个本地缓存 session storage是会话关闭就，没了。local storage关了还有
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2、进行登录验证。
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>
<style scoped lang="less"></style>
