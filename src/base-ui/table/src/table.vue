<template>
  <div class="hy-table">
    <!-- table-header -->
    <div class="header">
      <slot name="header">{{ title }}</slot>
    </div>
    <!-- table -->
    <!-- 选中的时候会触发select-change事件 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
      row-key="id"
      tree-props="children"
      v-bind="childrenProps"
    >
      <!-- 是否显示单选选中全部 -->
      <el-table-column
        v-if="showSelectColumn"
        align="center"
        width="80"
        type="selection"
      ></el-table-column>
      <!-- 是否显示第一列 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 大量的重复代码，所以需要抽取，就写在base-ui里面，也可以在其他地方用到 -->
      <!-- <el-table-column prop="name" label="用户名" min-width="180" />
      <el-table-column prop="realname" label="真是姓名" min-width="180" />
      <el-table-column prop="cellphpone" label="电话号码" min-width="180" /> -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <!-- show-overflow-tooltip当数据过长的时候显示为tooltip提示 -->
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- el-table-column里面是可以传入插槽的。通过作用域插槽穿过来的东西在scope里面。scope里面 -->
          <template #default="scope">
            <!-- scope.row就是这一行的数据 -->
            <!-- 每一行都是以按钮的形式 -->
            <!-- <el-button>{{ scope.row[propItem.name] }}</el-button> -->
            <!-- 因为有的是按钮有的是文字，所以要用插槽，但是插槽也是有默认值的 -->
            <!-- 通过scope.row把每一行的数据给传出去，传到上一层 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- table-footer
    layout是按顺序对页码行的展示
  total：总页数
  sizes：多少条一页
  prev：往前查询的小箭头
  pager：当前页
  next：往后查询的小箭头
  jumper：跳到哪一页
  offset偏移 应该是currentPage*pagesize 例如 当前页乘以每页显示多少条
    -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- page-size不应该写死 -->
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    listData: {
      type: Array,
      require: true
    },
    totalCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      require: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    // 把childrenProps绑定到table里面，通过v-bind
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emit: ['emitchange', 'update:page'],
  setup(props, { emit }) {
    // 下面是监听页码条数等的改变
    const handleSelectChange = (value: string) => {
      // console.log(value)
      //会把选中的数据以数组的形式传过来
      emit('emitchange', value)
    }
    const handleSizeChange = (pageSize: number) => {
      // 发送出去，通过emit
      // 拿到原来的值，再把pageSize的值放进去
      // console.log({ ...props.page }, 1111111)
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      // console.log({ ...props.page }, 2222)
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style scoped lang="less"></style>
