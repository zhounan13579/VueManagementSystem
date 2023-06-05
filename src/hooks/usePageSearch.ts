import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => {
    // console.log('handleResetClick')
    // 2、调用page-content里面的方法
    // 可选链 value没有值，后面就不调用了
    pageContentRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  // 下面这三个东西可以看成是一个元组
  return [pageContentRef, handleResetClick, handleQueryClick]
}
