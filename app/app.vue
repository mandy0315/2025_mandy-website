<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
// 預設 SEO meta
const site = runtimeConfig.public.SITE_URL;
const defaultTitle = "MandySpace";
const defaultDescription = "Hello～我是 Mandy！歡迎來到我的小天地 ✨ 這裡收藏著我的開發與設計作品、學習筆記、生活與技術文章，希望能與你分享我的所見所想～";
useSeoMeta({
  author: "蔡敏佳 Mandy",
  title: defaultTitle,
  description: defaultDescription,
  ogTitle: defaultTitle,
  ogDescription: defaultDescription,
  twitterTitle: defaultTitle,
  twitterDescription: defaultDescription,
  ogUrl: site,
});
defineOgImageComponent("CustomTemplate");
</script>
<template>
  <Body>
    <AppPageLoading />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
