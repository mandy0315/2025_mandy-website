<script setup lang="ts">
const route = useRoute();
const rule = useRobotsRule();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const runtimeConfig = useRuntimeConfig();
const site = runtimeConfig.public.SITE_URL;
useSeoMeta({
  title: currentTag.value ? `${currentTag.value} | 筆記標籤` : '筆記標籤',
  ogUrl: `${site}${route.path}`,
});
defineOgImageComponent("CustomTemplate", {
  title: currentTag.value ? `${currentTag.value} | 筆記標籤` : '筆記標籤',
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