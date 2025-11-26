<script setup lang="ts">
usePageSEO({
  title: '筆記',
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