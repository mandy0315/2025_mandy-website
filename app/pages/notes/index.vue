<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const route = useRoute();
const rule = useRobotsRule();
usePageSEO({
  title: '筆記',
  path: route.path,
})

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