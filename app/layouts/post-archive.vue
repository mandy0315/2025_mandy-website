<script setup lang="ts">
const { sidebarHeightCalc, headerHeight } = useLayoutSizes();
const { isDesktop } = useResponsive();
const getSidebarStyle = computed(() => {
  const sidebarHeight = isDesktop.value ? sidebarHeightCalc.value : 'auto';
  const topHeight = isDesktop.value ? `${headerHeight.value}px` : 0;
  return { top: topHeight, height: sidebarHeight }
})
</script>
<template>
  <div class="flex flex-col-reverse lg:flex-row c-container">
    <div class="transition-all ease-linear lg:sticky lg:w-60" :style="getSidebarStyle">
      <slot name="sidebar" />
    </div>
    <div class="w-full lg:w-7/10">
      <slot />
    </div>
  </div>
</template>