<template>
  <div class="login-account"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // 在这个Demo只是一个组件的描述。跟类很相似 class{name:string,age:string} const new P={name:'dd',age:'44'}
  // 另一个组件使用这个对象不是直接使用这个对象，而使用的是根据这个描述创建的组件实例<Demo/>如果在别的地方用那就是第二个实例，每一次用都是创建一个实例
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less"></style>
