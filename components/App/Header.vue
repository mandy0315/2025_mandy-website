<script setup lang="ts">

</script>
<template>
  <header>
    <NuxtLink to="/" class="fixed top-4 left-4 z-80">
      Logo
    </NuxtLink>
    <AppMenu />
    <div
      class="bg-[var(--bg-color)]/80 backdrop-blur-sm h-c-mobile-header-height flex w-full fixed top-0 justify-between items-center z-50 flex-row-reverse pl-4 pr-10 lg:h-screen lg:right-0 lg:w-c-web-header-width lg:flex-col lg:px-0 lg:pt-10 lg:pb-4">
      <AppSearch class="px-1.5" />
      <p class="hidden lg:block lg:text-xs vertical-rl">@2025mandyspace.</p>
      <AppColorModel class="ml-auto lg:ml-0" />
    </div>
  </header>

</template>
<style scoped>
.vertical-rl {
  writing-mode: vertical-rl;
}
</style>
