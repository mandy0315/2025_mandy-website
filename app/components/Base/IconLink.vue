<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string;
    icon: string;
    target?: '_self' | '_blank';
  }>(),
  {
    target: '_self',
  }
);
</script>
<template>
  <NuxtLink :to :target :rel="target === '_blank' ? 'noopener noreferrer' : undefined" aria-label="前往連結"
    class="rounded-full border c-border-secondary w-8 h-8 flex justify-center items-center hover:bg-primary/30 hover:border-primary">
    <Icon :name="icon" class="text-xl " />
  </NuxtLink>
</template>