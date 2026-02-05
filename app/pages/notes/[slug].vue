<script setup lang="ts">
const rule = useRobotsRule();

definePageMeta({
  middleware: ['post-detail'],
  layout: false,
})

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
