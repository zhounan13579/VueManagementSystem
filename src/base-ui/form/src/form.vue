<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 这个labelwidth不能写死 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              class="form-item"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <!-- 是否显示密码 -->
                <!-- v-model="formData[`${item.filed}`]" -->

                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="handleValueChange($event, item.filed)"
                ></el-input>
              </template>
              <!-- 此时不用formData了，用的是modelValue，做的是子组件传递给父组件的值的modelValue的绑定。如果值修改的话会触发update:modelValue的操作 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  allow-create
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="handleValueChange($event, item.filed)"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="handleValueChange($event, item.filed)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types/index'
export default defineComponent({
  props: {
    // 父向子传入属性，属性名字一般是固定的,默认是modelValue，也可以修改
    modelValue: {
      type: Object,
      // 必须传
      required: true
    },
    formItems: {
      // 断言，
      type: Array as PropType<IFormItem[]>,
      // 数组和对象有默认值的话要用箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 20px '
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: '6', //>1920显示4个 24/6
        lg: '8',
        md: '12',
        sm: '24',
        xs: '24'
      })
    }
  },
  emit: ['update:modelValue'],
  setup(props, { emit }) {
    // //1、用双向绑定
    // // 浅拷贝
    // const formData = ref({ ...props.modelValue })
    // // watch(
    // //   () => props.modelValue,
    // // //此时有点类似于递归和循环引用了
    // //   (newValue) => {
    // //     formData.value = { ...newValue }
    // //   }
    // // )
    // watch(
    //   formData,
    //   (newValue) => {
    //     // 子组件修改内容的时候发出事件，调用
    //     emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )
    // return { formData }
    // 2、不用双向绑定。因为v-model本质上是一个语法糖，所以我们可以用:model-value
    const handleValueChange = (value: any, filed: string) => {
      // 触发这个事件  传递参数（传递的是解构后的对象） 哪个值修改了传过去，（用filed作为key）。之后在外界的page-search.vue里就会绑定到这个大组件上面的v-model=formData的formData上面。
      // emit(发送的事件，发送的对象)
      emit('update:modelValue', { ...props.modelValue, [filed]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>
<style scoped lang="less">
.hy-form {
  padding-top: 22px;
  // 这种情况下，间距是写死的。可以动态编写间距
  .form-item {
    width: 5px 30px;
  }
}
</style>
