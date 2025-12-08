<script setup lang="ts">
definePageMeta({
  middleware: ['post-detail'],
  layout: false,
})
</script>
<template>
  <NuxtLayout name="post">
    <PostDetail collection="notes" />
    <template #sidebar>
      <PostDetailToc collection="notes" />
    </template>
  </NuxtLayout>
</template>
