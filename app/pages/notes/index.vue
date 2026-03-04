<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const rule = useRobotsRule();
const runtimeConfig = useRuntimeConfig();
const site = runtimeConfig.public.SITE_URL;
useSeoMeta({
  title: '筆記',
  description: '隨筆學習歷程 ✨',
  ogUrl: `${site}/notes`,
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