<script setup lang="ts">
import { pageMap } from "@/utils/appMap";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
<template>
  <header
    class="bg-[var(--bg-color)]/80 backdrop-blur-sm h-c-header-height flex border-b c-border-gray w-full sticky top-0 justify-between items-center z-50">
    <NuxtLink to="/">
      Logo
    </NuxtLink>
    <!-- menu -->
    <ul class="flex items-center gap-4">
      <li v-for="(item, index) in pageMap.values()" :key="index">
        <NuxtLink v-if="item.title !== 'home'" :to="item.path"
          class="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-all duration-300 ease-in-out">
          {{ capitalize(item.title) }}
        </NuxtLink>
      </li>
    </ul>
    <!-- tools -->
    <div class="flex items-center">
      <AppSearch />
      <AppColorModel />
    </div>
  </header>
</template>