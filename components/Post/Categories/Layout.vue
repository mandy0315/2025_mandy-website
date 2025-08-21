<script setup lang="ts">
defineProps<{
  collection: 'blog' | 'notes';
}>();
</script>
<template>
  <div class="flex">
    <div class="w-60 px-4 c-sidebar-height sticky top-0 overflow-hidden">
      <PostCategoriesAside :collection />
    </div>
    <div class="w-7/10">
      <NuxtPage />
    </div>
  </div>
</template>