<script setup lang="ts">
const route = useRoute();
usePageSEO({
  title: '部落格',
  path: route.path,
})
</script>
<template>
  <NuxtLayout name="post">
    <template #default>
      <PostList collection="blog" />
    </template>
    <template #sidebar>
      <PostListAside collection="blog" />
    </template>
  </NuxtLayout>
</template>