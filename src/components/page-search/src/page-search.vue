<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <!-- 插槽内容写到这里 -->
      <!-- 找到一个插槽名字叫做header的组件 -->
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handleBtns">
          <el-button type="primary" @click="handleResetClick()"
            ><el-icon size="small"> <Refresh /> </el-icon>重置</el-button
          >
          <el-button @click="handleQueryClick()"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
  components: {
    HyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  emit: ['resetBtnClick', ' queryBtnClick'],
  setup(props, { emit }) {
    // 优化一、双向绑定的属性应该是由配置文件的filed来决定的。可能是undefined所以是可选,如果前面为空那么就是空数组
    const formItem = props.searchFormConfig?.formItems ?? [] //??是空值合并操作符?.是可选链，有的话就取值，没有的话就取undefined。
    const formOriginData: any = {}
    for (const item of formItem) {
      formOriginData[item.filed] = '' //设置成空字符串
    }
    const formData = ref(formOriginData)
    // const formData = ref({
    //   id: '',
    //   sport: '',
    //   name: '',
    //   password: '',
    //   createTime: ''
    // })
    // return { formData }
    // 优化2、用户点击重置。用户点击重置希望组件form里面的小组件elinput等能够清空，但是因为父子之间传递的数据的单向数据流的原则。点击重置是想重置formData的数据，让formData.value=formOriginData，设置成原始的数据。
    const handleResetClick = () => {
      // 此时直接等formData.value=formOriginData是没有用的，因为HyForm是对formData的值进行的浅拷贝，不是直接用的formData的值，所以直接修改formData的值没有用。
      formData.value = formOriginData
      // 这里的emit是setup()里面的emit，不需要传递参数，因为重置即使空
      emit('resetBtnClick')
      // 下面这种方法和form.vue里面的watch、v-model是同一种方法。
      // for (const key in formOriginData) {
      //   // 一个个修改formData里面属性的值。这样在封装好的子组件form.vue组件里面才能修改
      //   formData.value[`key`] = formOriginData[key]
      //
    }

    // 优化3、当用户点击搜索
    const handleQueryClick = () => {
      // 当用户点击搜索时发生的事情，需要把formData就是那些输入框里面的数据拿到之后发送网络请求，网络请求是在page-content.vue里面发送的。而setup有点像生命周期create，create组件只会调用一次。这个时候我们可以把数据传递到user.vue，然后再由user.vue传递到page-content.vue里面。所以此时用户点击搜索和重置其实是同一个道理，
      // 如果不传递第二个参数就是传递为空，如果传递第二个参数就是把第二个参数就是formData就是那些输入框里面的数据传递过去才能去做搜索
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>
<style scoped lang="less">
.handleBtns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
