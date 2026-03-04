<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostTagsAside collection="blog" />
    </template>
  </NuxtLayout>

</template>