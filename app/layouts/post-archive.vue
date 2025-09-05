<script setup lang="ts">
const { sidebarHeightCalc, headerHeight } = useLayoutSizes();
</script>
<template>
  <div class="flex c-container">
    <div class="transition-all ease-linear w-60 sticky"
      :style="{ top: `${headerHeight}px`, height: sidebarHeightCalc }">
      <slot name="sidebar" />
    </div>
    <div class="w-7/10">
      <slot />
    </div>
  </div>
</template>