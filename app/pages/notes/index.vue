<script setup lang="ts">
definePageMeta({
  middleware: ['tags'],
  layout: false,
})

const rule = useRobotsRule();
const titleTxt = '筆記';
const descriptionTxt = '這裡是我的學習筆記小空間，紀錄學習過程中的心得，涵蓋網頁開發與軟體和工具相關知識，歡迎留言與我交流。';
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