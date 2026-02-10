<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute();
usePageSEO({
  title: '部落格',
  path: route.path,
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