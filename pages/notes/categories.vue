<script setup lang="ts">
const route = useRoute();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories']
})

usePageSEO({
  title: currentCategory.value ? `${currentCategory.value} | 筆記分類` : '筆記分類',
})
</script>
<template>
  <NuxtLayout name="post-archive">
    <template #content>
      <NuxtPage />
    </template>
    <template #sidebar>
      <PostCategoriesAside collection="notes" />
    </template>
  </NuxtLayout>
</template>