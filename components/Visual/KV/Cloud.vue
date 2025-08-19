<script setup lang="ts">
withDefaults(defineProps<{
  size: 'sm' | 'md' | 'lg',
}>(), {
  size: 'md',
});
const sizeClasses = {
  sm: 'scale-75',
  md: 'scale-100',
  lg: 'scale-125',
};
</script>
<template>
  <div class="relative transform origin-center animate-drift" :class="sizeClasses[size]">
    <div class="flex items-end">
      <div class="w-5 h-5 rounded-full bg-white"></div>
      <div class="w-3 h-3 rounded-full bg-white"></div>
    </div>
    <div class="w-10 h-2 rounded-l-full rounded-r-full bg-white absolute bottom-0 right-0"></div>
  </div>
</template>