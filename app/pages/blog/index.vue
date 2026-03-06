<script setup lang="ts">
definePageMeta({
  layout: false,
})

const titleTxt = '部落格';
const descriptionTxt = '紀錄學習歷程與生活點滴 ✨';
useMetaPage({
  title: titleTxt,
  description: descriptionTxt,
  path: '/blog',
})
defineOgImageComponent("CustomTemplate", {
  title: titleTxt,
  description: descriptionTxt,
});
</script>
<template>
  <NuxtLayout name="post">
    <PostList collection="blog" />
    <template #sidebar>
      <PostListAside collection="blog" />
    </template>
  </NuxtLayout>
</template>