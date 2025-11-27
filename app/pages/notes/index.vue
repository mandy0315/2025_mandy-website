<script setup lang="ts">
const route = useRoute();
usePageSEO({
  title: '筆記',
  path: route.path,
})
</script>
<template>
  <NuxtLayout name="post">
    <template #default>
      <PostList collection="notes" />
    </template>
    <template #sidebar>
      <PostListAside collection="notes" />
    </template>
  </NuxtLayout>
</template>