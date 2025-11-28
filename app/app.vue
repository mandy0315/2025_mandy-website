<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const { isLoading } = usePageLoading();
const isOpenMenu = useState('isOpenMenu', () => false);

const config = useRuntimeConfig();
const isGithubPages = config.public.GITHUB_ACTIONS === "true";
const baseURL = isGithubPages ? "/2025_mandy-website/" : "/";

useHead({
  htmlAttrs: {
    lang: "zh-TW"
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: `${baseURL}favicon.ico`
    }
  ],
})
</script>

<template>
  <Body :class="[{ 'overflow-hidden': isShowSearchModal || isOpenMenu }, { 'main-bg': !isLoading }]">
    <AppPageLoading />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
