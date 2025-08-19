<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <p class="font-bold text-sm border-b c-border-secondary py-2 ">{{ title }}</p>
</template>