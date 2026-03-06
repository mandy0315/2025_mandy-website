<script setup lang="ts">
const route = useRoute();
const rule = useRobotsRule();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories'],
  layout: false,
})

const titleTxt = currentCategory.value ? `分類-${currentCategory.value}` : '分類';
const descriptionTxt = '所有學習筆記分類';
useMetaPage({
  title: titleTxt,
  description: descriptionTxt,
  path: route.path,
})
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
      <PostCategoriesAside collection="notes" />
    </template>
  </NuxtLayout>
</template>