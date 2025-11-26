<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const { isLoading } = usePageLoading();
const isOpenMenu = useState('isOpenMenu', () => false);
</script>

<template>
  <Body :class="[{ 'overflow-hidden': isShowSearchModal || isOpenMenu }, { 'main-bg': !isLoading }]">
    <AppPageLoading />
    <div class="flex flex-col lg:min-h-screen" :class="isLoading
      ? 'opacity-0 pointer-events-none'
      : 'opacity-100 pointer-events-auto'">
      <AppHeader />
      <main class="lg:flex-1 mt-24">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </Body>
</template>
