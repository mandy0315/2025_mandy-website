<script setup lang="ts">
const { isLoading } = usePageLoading();
</script>
<template>
  <div class="flex flex-col min-h-screen" :class="isLoading
    ? 'opacity-0 pointer-events-none'
    : 'opacity-100 pointer-events-auto'">
    <AppHeader />
    <main class="lg:flex-1 mt-24">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>