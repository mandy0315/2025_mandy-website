<script setup lang="ts">
import { firstWordToUpper } from '@/utils/formatText';

defineProps<{
  titleEn: string;
  title: string;
}>();
</script>
<template>
  <p class="font-bold py-4 text-sm lg:text-base">
    <span>{{ title }}</span>
    <span class="pr-1">{{ firstWordToUpper(titleEn) }}</span>
  </p>
</template>