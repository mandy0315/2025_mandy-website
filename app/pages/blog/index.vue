<script setup lang="ts">
usePageSEO({
  title: '部落格',
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