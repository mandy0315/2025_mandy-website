<script setup lang="ts">
</script>
<template>
  <header class="h-header">
    <NuxtLink to="/" class="fixed z-80 p-5">
      <IconLogo class="w-18 dark:fill-white lg:w-20" />
    </NuxtLink>
    <div
      class="flex items-end fixed z-100 right-4 top-4 flex-row-reverse gap-x-2 lg:flex-col lg:items-center lg:gap-y-2">
      <AppMenu />
      <AppColorModel />
      <AppSearch />
    </div>
  </header>

</template>
<style scoped>
.vertical-rl {
  writing-mode: vertical-rl;
}
</style>
