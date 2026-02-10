<script setup lang="ts">
definePageMeta({
  layout: false,
})

usePageSEO({
  title: '部落格',
  path: '/blog',
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