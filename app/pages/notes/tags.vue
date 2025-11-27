<script setup lang="ts">
const route = useRoute();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags']
})

usePageSEO({
  title: currentTag.value ? `${currentTag.value} | 筆記標籤` : '筆記標籤',
  path: route.path,
})
</script>
<template>
  <NuxtLayout name="post-archive">
    <template #default>
      <NuxtPage />
    </template>
    <template #sidebar>
      <PostTagsAside collection="notes" />
    </template>
  </NuxtLayout>
</template>