<script setup lang="ts">
const route = useRoute();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories'],
  layout: false,
})

usePageSEO({
  title: currentCategory.value ? `${currentCategory.value} | 筆記分類` : '筆記分類',
  path: route.path,
})
</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostCategoriesAside collection="notes" />
    </template>
  </NuxtLayout>
</template>