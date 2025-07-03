<script setup lang="ts">
import { pageMap } from "@/utils/appMap";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
<template>
  <header>
    <NuxtLink to="/" class="fixed top-4 left-4 z-100">
      Logo
    </NuxtLink>
    <!-- bg-[var(--bg-color)]/80 -->
    <div
      class="bg-amber-300 backdrop-blur-sm h-c-mobile-header-height flex border-b c-border-gray w-full fixed top-0 justify-between items-center z-50 flex-row-reverse px-4">
      <AppMenu class="px-1.5" />
      <AppSearch class="px-1.5" />
      <AppColorModel class="ml-auto" />
    </div>
  </header>

</template>