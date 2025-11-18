<script setup lang="ts">
const { sidebarHeightCalc, headerHeight } = useLayoutSizes();
const sidebarStyle = computed(() => ({
  '--sidebar-top': `${headerHeight.value}px`,
  '--sidebar-height': sidebarHeightCalc.value,
}));
</script>
<template>
  <div class="flex flex-col-reverse lg:flex-row relative c-container">
    <div
      class="transition-all w-full ease-linear top-0 h-auto lg:sticky lg:w-60 lg:[top:var(--sidebar-top)] lg:[height:var(--sidebar-height)]"
      :style="sidebarStyle">
      <slot name="sidebar" />
    </div>
    <div class="flex-1 lg:pr-4 lg:min-h-screen">
      <slot />
    </div>
  </div>
</template>