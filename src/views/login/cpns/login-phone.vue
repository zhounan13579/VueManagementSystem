<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="account">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="account.password"></el-input>
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from './../config/phone-config'
export default defineComponent({
  setup() {
    // props里面的内容最好只用不改
    const account = reactive({
      number: '',
      code: ''
    })

    return {
      account,
      rules
    }
  }
})
</script>
<style scoped lang="less">
.login-phone {
  .get-code {
    display: flex;
    .get-btn {
      margin-left: 10px;
    }
  }
}
</style>
