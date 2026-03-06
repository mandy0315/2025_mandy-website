<script setup lang="ts">
definePageMeta({
  middleware: ['post-detail'],
  layout: false,
})

const rule = useRobotsRule();
rule.value = 'noindex, nofollow';
</script>
<template>
  <NuxtLayout name="post">
    <PostDetail collection="notes" />
    <template #sidebar>
      <PostDetailToc collection="notes" />
    </template>
  </NuxtLayout>
</template>
