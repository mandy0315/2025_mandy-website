<script setup lang="ts">
definePageMeta({
  middleware: ['post-detail']
})
</script>
<template>
  <NuxtLayout name="post">
    <template #default>
      <PostDetail collection="blog" />
    </template>
    <template #sidebar>
      <PostDetailToc collection="blog" />
    </template>
  </NuxtLayout>
</template>