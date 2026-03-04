<script setup lang="ts">
const route = useRoute();
const rule = useRobotsRule();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories'],
  layout: false,
})

useSeoMeta({
  title: currentCategory.value ? `${currentCategory.value} | 筆記分類` : '筆記分類',
  ogUrl: route.path,
})

rule.value = 'noindex, nofollow';
</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostCategoriesAside collection="notes" />
    </template>
  </NuxtLayout>
</template>