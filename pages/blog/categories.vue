<script setup lang="ts">
const route = useRoute();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories']
})

usePageSEO({
  title: currentCategory.value ? `${currentCategory.value} | 部落格分類` : '部落格分類',
})
</script>
<template>
  <PostCategoriesLayout collection="blog" class="c-container" />
</template>