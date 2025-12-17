<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const { isLoading } = usePageLoading();
const isOpenMenu = useState('isOpenMenu', () => false);

const config = useRuntimeConfig();

useHead({
  htmlAttrs: {
    lang: "zh-TW"
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: `${config.public.BASE_URL}favicon.ico`
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
