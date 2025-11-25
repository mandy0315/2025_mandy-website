<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const { isLoading } = usePageLoading();
const isOpenMenu = useState('isOpenMenu', () => false);
</script>

<template>
  <Body :class="{ 'overflow-hidden': isShowSearchModal || isOpenMenu }">
    <AppPageLoading />
    <div v-show="!isLoading" class="flex flex-col lg:min-h-screen" :class="{ 'main-bg': !isLoading }">
      <AppHeader />
      <main class="lg:flex-1 mt-24">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </Body>
</template>
