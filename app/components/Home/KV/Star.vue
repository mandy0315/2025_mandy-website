<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg',
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
  <div class="relative transform origin-center" :class="sizeClasses[size]">
    <!-- 外層光暈 -->
    <div
      class="w-2 h-2 rounded-full bg-white/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping">
    </div>
    <!-- 內層星核 -->
    <div class="w-1.5 h-1.5 rounded-full bg-white "></div>
  </div>
</template>