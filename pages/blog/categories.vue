<script setup lang="ts">
definePageMeta({
  middleware: ['categories']
})
usePageSEO({
  title: '部落格-分類',
})
</script>
<template>
  <PostCategoriesLayout collection="blog" />
</template>