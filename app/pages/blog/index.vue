<script setup lang="ts">
definePageMeta({
  layout: false,
})

const titleTxt = '部落格';
const descriptionTxt = '這裡是我的寫作小空間，分享生活所見所聞與技術心得，也有個人介紹，希望透過文字讓更多人認識我，歡迎留言與我交流。';
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