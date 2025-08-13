<script setup lang="ts">
definePageMeta({
  middleware: ['categories']
})
usePageSEO({
  title: '筆記-分類',
})
</script>
<template>
  <PostCategoriesLayout collection="notes" />
</template>