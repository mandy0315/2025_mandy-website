<script setup lang="ts">
import { firstWordToUpper } from '@/utils/formatText';

defineProps<{
  titleEn: string;
  title: string;
}>();
</script>
<template>
  <p class="font-bold text-xs pt-2">
    <span class="pr-1">{{ firstWordToUpper(titleEn) }}</span>
    <span>{{ title }}</span>
  </p>
</template>