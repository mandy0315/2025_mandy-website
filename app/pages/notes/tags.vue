<script setup lang="ts">
const route = useRoute();
const rule = useRobotsRule();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const titleTxt = currentTag.value ? `標籤-${currentTag.value}` : '標籤';
const descriptionTxt = '所有學習筆記標籤';
useMetaPage({
  title: titleTxt,
  description: descriptionTxt,
  path: route.path,
});
defineOgImageComponent("CustomTemplate", {
  title: titleTxt,
  description: descriptionTxt,
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