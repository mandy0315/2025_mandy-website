<script setup lang="ts">
const route = useRoute();
const currentCategory = computed(() => route.params.category || '');

definePageMeta({
  middleware: ['categories'],
  layout: false,
})
const runtimeConfig = useRuntimeConfig();
const site = runtimeConfig.public.SITE_URL;
useSeoMeta({
  title: currentCategory.value ? `${currentCategory.value} | 部落格分類` : '部落格分類',
  ogUrl: `${site}${route.path}`,
});
defineOgImageComponent("CustomTemplate", {
  title: currentCategory.value ? `${currentCategory.value} | 部落格分類` : '部落格分類',
});
</script>
<template>
  <NuxtLayout name="post-archive">
    <NuxtPage />
    <template #sidebar>
      <PostCategoriesAside collection="blog" />
    </template>
  </NuxtLayout>

</template>