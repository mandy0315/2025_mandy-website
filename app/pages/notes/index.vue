<script setup lang="ts">
const route = useRoute();
usePageSEO({
  title: '筆記',
  path: route.path,
})

definePageMeta({
  middleware: ['tags'],
  layout: false,
})
</script>
<template>
  <NuxtLayout name="post">
    <PostList collection="notes" />
    <template #sidebar>
      <PostListAside collection="notes" />
    </template>
  </NuxtLayout>
</template>