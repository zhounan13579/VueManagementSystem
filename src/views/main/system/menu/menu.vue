<template>
  <div class="menu">
    <PageContent :contentTableConfig="contentConfig" pageUrlName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentConfig } from './config/content.config'
export default defineComponent({
  name: 'hy-menu',
  components: {
    PageContent
  },
  setup() {
    return { contentConfig }
  }
})
</script>

<style scoped></style>
