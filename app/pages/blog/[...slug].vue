<script setup lang="ts">
definePageMeta({
  middleware: ['post-detail'],
  layout: false,
})
</script>
<template>
  <NuxtLayout name="post">
    <PostDetail collection="blog" />
    <template #sidebar>
      <PostDetailToc collection="blog" />
    </template>
  </NuxtLayout>

</template>