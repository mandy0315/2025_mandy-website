<script setup lang="ts">
const route = useRoute();
usePageSEO({
  title: '部落格',
  path: route.path,
})
definePageMeta({
  layout: false,
})
</script>
<template>
  <NuxtLayout name="post">
    <PostList collection="blog" />
    <template #sidebar>
      <PostListAside collection="blog" />
    </template>
  </NuxtLayout>
</template>