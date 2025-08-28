<script setup lang="ts">
const route = useRoute();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags']
})

usePageSEO({
  title: currentTag.value ? `${currentTag.value} | 部落格標籤` : '部落格標籤',
})
</script>
<template>
  <NuxtLayout name="post-archive">
    <template #default>
      <NuxtPage />
    </template>
    <template #sidebar>
      <PostTagsAside collection="blog" />
    </template>
  </NuxtLayout>
</template>