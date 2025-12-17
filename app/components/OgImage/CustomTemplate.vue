<script setup lang="ts">
withDefaults(defineProps<{
  title: string,
  description: string,
}>(), {
})
</script>

<template>
  <div class="bg-[#fbf4ef] h-full w-full flex items-start justify-start">
    <div class="p-20">
      <h1 class="text-6xl font-black text-left">
        {{ title }}
      </h1>
      <p class="text-3xl text-secondary-light font-light">{{ description }}</p>
    </div>
    <div class="mt-auto mx-auto pb-3">
      <img src="/images/logo-horizontal.png" class="w-52 h-16" alt="logo">
    </div>
  </div>
</template>