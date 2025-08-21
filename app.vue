<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const isOpenMenu = useState('isOpenMenu', () => false);
</script>

<template>
  <Body :class="{ 'overflow-hidden': isShowSearchModal || isOpenMenu }">
    <AppPageLoading />
    <div class="flex flex-col min-h-screen">
      <AppHeader />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <p class="text-sm fixed bottom-0 right-0">@2025mandyspace.</p>
      <AppFooter />
    </div>
  </Body>
</template>
