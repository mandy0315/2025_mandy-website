<script setup lang="ts">
definePageMeta({
  layout: false,
})

const runtimeConfig = useRuntimeConfig();
const site = runtimeConfig.public.SITE_URL;
useSeoMeta({
  title: '部落格',
  description: '紀錄學習歷程與成長點滴 ✨',
  ogUrl: `${site}/blog`,
})
</script>
<template>
  <NuxtLayout name="post">
    <PostList collection="blog" />
    <template #sidebar>
      <PostListAside collection="blog" />
    </template>
  </NuxtLayout>
</template>