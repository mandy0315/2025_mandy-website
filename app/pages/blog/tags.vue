<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const route = useRoute();
const currentTag = computed(() => route.params.tag || '');
const titleTxt = currentTag.value ? `標籤-${currentTag.value}` : '標籤';
const descriptionTxt = '這裡是標籤總覽頁面，可透過標籤快速找到相關文章，節省尋找時間，專注於閱讀內容，歡迎留言與我交流。';
useMetaPage({
  title: titleTxt,
  description: descriptionTxt,
  path: route.path,
});
defineOgImageComponent("CustomTemplate", {
  title: titleTxt,
  description: descriptionTxt,
});
</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostTagsAside collection="blog" />
    </template>
  </NuxtLayout>

</template>