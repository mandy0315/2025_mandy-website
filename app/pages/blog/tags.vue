<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const route = useRoute();
const currentTag = computed(() => route.params.tag || '');
const titleTxt = currentTag.value ? `標籤-${currentTag.value}` : '標籤';
const descriptionTxt = '所有部落格文章標籤';
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