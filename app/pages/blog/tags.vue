<script setup lang="ts">
const route = useRoute();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags'],
  layout: false,
})

usePageSEO({
  title: currentTag.value ? `${currentTag.value} | 部落格標籤` : '部落格標籤',
  path: route.path,
})
</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostTagsAside collection="blog" />
    </template>
  </NuxtLayout>

</template>