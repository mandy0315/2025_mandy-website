<script setup lang="ts">
const props = defineProps<{
  path: string,
  date: string,
  title: string,
}>()

</script>
<template>
  <NuxtLink :to="path" class="group block p-4 hover:bg-primary/20">
    <PostDate :date class="block" />
    <p class="text-xl"> {{ title }}</p>
  </NuxtLink>
</template>