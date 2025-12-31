<script setup lang="ts">
import { firstWordToUpper } from '@/utils/formatText';

defineProps<{
  titleEn: string;
  title: string;
}>();
</script>
<template>
  <p class="font-bold pt-4 pb-2 text-lg lg:text-base">
    <span>{{ title }}</span>
    <span class="pr-1">{{ firstWordToUpper(titleEn) }}</span>
  </p>
</template>