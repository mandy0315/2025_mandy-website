<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <p class="font-bold text-sm border-b border-primary py-2 ">{{ title }}</p>
</template>