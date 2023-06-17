<template>
  <div class="user">
    <!-- <hy-form
        :formItems="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
        :colLayout="colLayout"
      /> -->
    <!-- <hy-form v-bind="searchFormConfig" :formData="formData"></hy-form> -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <div class="content">
      <!-- pageUrlName="users" -->
      <!-- ref="pageContentRef"是为了拿到page-content里面搜索框里面的数据 -->
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentConfig"
        pageUrlName="users"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/usePageSearch'
// import { } from 'vue'
export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent },
  setup() {
    // const labelWidth = '120px'
    // const itemStyle = {
    //   padding: '10px 40px'
    // }
    // const colLayout = {
    //   span: 8
    // }
    // const store = useStore()
    // // 因为查询不同数据只相差一个参数例如：user/list count/list
    // // 不同的页面可以做不同的操作。
    // // systemModule模块下的action里面的getPageListAction方法
    // store.dispatch('systemModule/getPageListAction', {
    //   // 把这些内容发送
    //   pageUrl: 'users/list',
    //   pageInfo: {
    //     offset: 0,
    //     size: 10
    //   }
    // })
    // // const title = '用户列表'
    // // // computed的意义在于数据发生变化的时候能第一时间拿到
    // const userList = computed(() => store.state.systemModule.userList)
    // // // 分页器
    // const userCount = computed(() => store.state.systemModule.userCount)
    // // 针对userList的配置文件
    // const propList = [
    //   { prop: 'name', label: '用户名', minWidth: '100' },
    //   { prop: 'realname', label: '真实姓名', minWidth: '100' },
    //   { prop: 'cellphone', label: '电话号码 ', minWidth: '100' },
    //   // 有的有slotName，有的没有，是为了可以自定义是否存在插槽。
    //   { prop: 'enable', label: '状态 ', minWidth: '100', slotName: 'status' },
    //   {
    //     prop: 'createAt',
    //     label: '创建时间 ',
    //     minWidth: '180',
    //     slotName: 'createTime'
    //   },
    //   {
    //     prop: 'updateAt',
    //     label: '更新时间 ',
    //     minWidth: '180',
    //     slotName: 'updateTime'
    //   },
    //   {
    //     label: '操作 ',
    //     minWidth: '180',
    //     slotName: 'handle'
    //   }
    // ]
    // const showIndexColumn = ref(true)
    // const showSelectColumn = ref(true)
    // const rechange = () => {
    //   // console.log('ddd')
    // }
    // 下面的内容都在hooks里面
    // 1、拿到page-content组件的内容，
    // const pageContentRef = ref<InstanceType<typeof PageContent>>()
    // const handleResetClick = () => {
    //   // console.log('handleResetClick')
    //   // 2、调用page-content里面的方法
    //   // 可选链 value没有值，后面就不调用了
    //   pageContentRef.value?.getPageData()
    // }
    // const handleQueryClick = (queryInfo: any) => {
    //   pageContentRef.value?.getPageData(queryInfo)
    // }
    // 2、下面是从hooks里面拿的东西。也可以直接在return里面写...usePageSearch()，但是这样阅读性太差
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      // title,
      searchFormConfig,
      contentConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef
      // userList,
      // userCount
      // propList,
      // showIndexColumn,
      // showSelectColumn,
      // rechange
      // formItems,
      // labelWidth,
      // itemStyle,
      // colLayout
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
