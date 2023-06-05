<template>
  <div class="role">
    <h2>role</h2>
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent pageUrlName="role" :contentTableConfig="contentConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      contentConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
