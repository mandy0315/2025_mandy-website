<script setup lang="ts">
const route = useRoute();
const rule = useRobotsRule();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories'],
  layout: false,
})

const titleTxt = currentCategory.value ? `分類-${currentCategory.value}` : '分類';
const descriptionTxt = '類別總覽頁面，可透過類別快速找到相關筆記，節省尋找時間，專注於閱讀內容，歡迎留言與我交流。';
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