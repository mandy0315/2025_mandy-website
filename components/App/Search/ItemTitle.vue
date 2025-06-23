<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <p class="font-bold text-sm border-b c-border-gray py-2 c-text-gray">{{ title }}</p>
</template>