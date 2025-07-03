<script setup lang="ts">
const { isShowSearchModal } = await useSearch();

</script>

<template>
  <Body :class="{ 'overflow-hidden': isShowSearchModal }">
    <AppPageLoading />
    <div id="container" class="flex flex-col min-h-screen">
      <AppHeader />
      <main class="flex-1 mt-c-mobile-header-height">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </Body>
</template>
