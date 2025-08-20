<script setup lang="ts">
defineProps<{
  date: string | null
}>()
</script>
<template>
  <p class="text-sm ">
    <Icon class="align-middle mr-1" name="solar:calendar-linear" />
    <span v-if="date" v-date-format="date" class="align-middle"></span>
  </p>
</template>