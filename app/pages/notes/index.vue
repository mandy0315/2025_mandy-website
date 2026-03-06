<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const rule = useRobotsRule();
const titleTxt = '筆記';
const descriptionTxt = '隨筆學習歷程 ✨';
useMetaPage({
  title: titleTxt,
  description: descriptionTxt,
  path: '/notes',
});
defineOgImageComponent("CustomTemplate", {
  title: titleTxt,
  description: descriptionTxt,
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