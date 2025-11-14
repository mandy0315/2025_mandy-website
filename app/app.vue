<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const isOpenMenu = useState('isOpenMenu', () => false);
</script>

<template>
  <Body :class="{ 'overflow-hidden': isShowSearchModal || isOpenMenu }">
    <AppPageLoading />
    <div class="flex flex-col lg:min-h-screen">
      <AppHeader />
      <main class="lg:flex-1 mt-24">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </Body>
</template>
