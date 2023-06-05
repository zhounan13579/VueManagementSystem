<template>
  <div class="goods">
    <!-- 需要给pagecontent传递参数 -->
    <page-content :contentTableConfig="contentConfig" pageUrlName="goods">
      <!-- 自定义插槽名字为imageURL的具体内容是什么 -->
      <!--  -->
      <template #imageUrl="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'

import { contentConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
  components: { PageContent },
  setup() {
    return { contentConfig }
  }
})
</script>

<style scoped></style>
