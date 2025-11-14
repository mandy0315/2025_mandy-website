<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle: string;
}>()
</script>
<template>
  <h2 class="font-bold font-zen-old-mincho text-lg text-text-light dark:text-text-dark pb-2">
    <span class="pr-1">{{ props.title }}</span>
    <span class="text-base">{{ props.subtitle }}</span>
  </h2>
</template>