<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const rule = useRobotsRule();
usePageSEO({
  title: '筆記',
  path: '/notes',
  description: '隨筆學習歷程 ✨'
});

rule.value = 'noindex, nofollow';
</script>
<template>
  <NuxtLayout name="post">
    <PostList collection="notes" />
    <template #sidebar>
      <PostListAside collection="notes" />
    </template>
  </NuxtLayout>
</template>