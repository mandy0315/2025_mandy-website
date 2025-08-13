<script setup lang="ts">
withDefaults(
  defineProps<{
    isAction?: boolean;
  }>(),
  {
    isAction: false,
  }
);
</script>
<template>
  <button class="c-rounded-btn rounded-2xl px-3 hover:text-c-light-brown" :class="{ 'text-c-light-brown': isAction }">
    <slot />
  </button>
</template>