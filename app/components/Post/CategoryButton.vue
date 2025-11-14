<script setup lang="ts">
withDefaults(
  defineProps<{
    category?: string;
    isAction?: boolean;
  }>(),
  {
    category: '',
    isAction: false,
  }
);
</script>

<template>
  <button class="py-1 px-2 block w-full lg:text-sm text-left my-1 rounded-xs hover:bg-primary/30"
    :class="{ 'text-primary hover:bg-transparent': isAction }">
    <Icon name="solar:folder-bold" size="1rem" class=" align-middle" />
    {{ category }}
  </button>
</template>