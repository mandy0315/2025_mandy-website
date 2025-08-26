<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string;
    icon: string;
    target?: '_self' | '_blank';
    external?: boolean;
  }>(),
  {
    external: false,
    target: '_self',
  }
);
</script>
<template>
  <NuxtLink :to :target :external
    class="rounded-full border c-border-secondary w-8 h-8 flex justify-center items-center hover:bg-primary/30 hover:border-primary">
    <Icon :name="icon" class="text-xl " />
  </NuxtLink>
</template>