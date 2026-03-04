<script setup lang="ts">
const route = useRoute();
const rule = useRobotsRule();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags'],
  layout: false,
})

usePageSEO({
  title: currentTag.value ? `${currentTag.value} | 筆記標籤` : '筆記標籤',
  path: route.path,
});

rule.value = 'noindex, nofollow';
</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostTagsAside collection="notes" />
    </template>
  </NuxtLayout>
</template>