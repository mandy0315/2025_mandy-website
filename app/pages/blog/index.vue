<script setup lang="ts">
definePageMeta({
  layout: false,
})

usePageSEO({
  title: '部落格',
  path: '/blog',
  description: '紀錄學習歷程與成長點滴 ✨',
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