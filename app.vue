<script setup lang="ts">
const { isShowSearchModal } = await useSearch();

</script>

<template>
  <Body :class="{ 'overflow-hidden': isShowSearchModal }">
    <AppPageLoading />


    <NuxtLink to="/" class="fixed top-4 left-4 z-100">
      Logo
    </NuxtLink>

    <AppHeader />

    <main class="max-w-[1200px] px-4 mx-auto min-h-[calc(100vh-theme(spacing.c-header-height))]">
      <NuxtPage />
    </main>

    <AppFooter />
  </Body>
</template>
