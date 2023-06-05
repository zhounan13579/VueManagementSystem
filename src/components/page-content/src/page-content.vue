<template>
  <div class="page-content">
    <!-- 这些内容都是从hy-table标签里面提取出来的。 -->
    <!-- :propList="propList"
      :showIndexColumn="showIndexColumn"
      :showSelectColumn="showSelectColumn"
      @emitchange="rechange" -->
    <hy-table
      :listData="dataList"
      :totalCount="totalDataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1、header中的插槽 -->
      <!-- 表格表头 -->
      <!-- <template :title="title" #header>
        <span>{{ title }}</span>
        <el-button type="primary">新建用户</el-button>
      </template> -->
      <!-- 2、列表中的插槽 -->
      <!-- 中间的表格内容 -->
      <!-- 修改插槽名字是status的内容为button格式 -->
      <!-- scope是上一层传递过来的内容 -->
      <!-- plain是镂空的意思 -->
      <!-- <template plain #status="scope" :title="title" size="small"> -->
      <template #status="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <!-- <template #createTime="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateTime="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template> -->
      <!-- 2.1上面的都是固定的插槽 -->
      <!-- 2.2下面的才是动态插槽，是在page-content中动态插入剩余的插槽。下面的写完之后才能在goods.vue里面写#image="scope"这样的代码 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 当slotName有值的时候再给它插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <!-- 不需要作用域-->
      <template #handle>
        <div class="handle-btns">
          <!-- <el-button icon="el-icon-edit" size="small" type="text"
              >编辑</el-button
            > -->
          <el-button size="small" type="text"
            ><el-icon size="small"><Edit /></el-icon>编辑</el-button
          >
          <el-button size="small" type="text"
            ><el-icon size="small"><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>
      <!-- 表格尾部 -->
      <template #footer></template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import HyTable from '@/base-ui/table'
export default defineComponent({
  components: { HyTable },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    title: {
      type: String,
      default: ''
    },

    pageUrlName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const store = useStore()
    //1、 双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 0,
      pageSize: 10
    })
    // 监听pageInfo，当pageInfo发生改变的时候，重现调用一次getPageData
    watch(pageInfo, () => getPageData())
    // 传递查询的参数，如果没有值的话就给一个空对象
    const getPageData = (queryInfo: any = {}) => {
      // 因为查询不同数据只相差一个参数例如：user/list count/list
      // 不同的页面可以做不同的操作。
      // systemModule模块下的action里面的getPageListAction方法
      // 2、发送网络请求

      store.dispatch('systemModule/getPageListAction', {
        // 把这些内容发送
        pageName: props.pageUrlName,
        pageInfo: {
          // 偏移量 offset=currentPage*pageSize 例如currentPage是个0的话那结果就是0，那么就是偏移0。所以如果点击向左或者向右的按钮的时候，currentPage发生改变，那么offset也会发生改变，
          // offset: 0,

          // size: 10,
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // // computed的意义在于数据发生变化的时候能第一时间拿到 这
    // const userList = computed(() => store.state.systemModule.userList)
    // 分页器 种情况下是直接去state里面去拿的。我们必须从systemodule模块里面去拿
    // const userCount = computed(() => store.state.systemModule.userCount)

    // 3、下面是从vuex中获取数据
    const dataList = computed(() =>
      //   // 调用这个函数所以需要加小括号，需要把传递的内容传进去，所以需要写在小括号里面
      store.getters[`systemModule/pageDataList`](props.pageUrlName)
    )
    // const totalUserCount = ref(100)
    const totalDataCount = computed(() =>
      //   // 调用这个函数所以需要加小括号，需要把传递的内容传进去，所以需要写在小括号里面
      store.getters[`systemModule/pageDataCount`](props.pageUrlName)
    )
    // console.log(totalUserCount)
    // 4、获取其他的动态插槽名称。因为上面的是固定的，是不需要的
    // 这里的props是本组件的props，contentTableConfig是我们传递给子组件table.vue的综合内容，propList可以在table.vue里面找到，是子组件插槽的名字
    const otherPropsSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // 这些可以去contentTableConfig.ts里面查看
        if (item.slotName === 'status') return false //如果是TRUE的话就加入到otherPropSlots里面去了。
        if (item.slotName === 'createTime') return false
        if (item.slotName === 'updateTime') return false
        if (item.slotName === 'handle') return false
        // 其他的默认是TRUE
        return true
      }
    )
    return { dataList, getPageData, totalDataCount, pageInfo, otherPropsSlots }
  }
})
</script>
<style scoped lang="less"></style>
