<script setup lang="ts">
const { sidebarHeightCalc, headerHeight } = useLayoutSizes();
const sidebarStyle = computed(() => ({
  '--sidebar-top': `${headerHeight.value}px`,
  '--sidebar-height': sidebarHeightCalc.value,
}));

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="lg:flex-1 mt-24">
      <div class="flex flex-col-reverse lg:flex-row relative c-container">
        <div class="transition-all w-full ease-linear lg:sticky lg:w-60 sidebar-container" :style="sidebarStyle">
          <slot name="sidebar" />
        </div>
        <div class="flex-1 lg:pr-4 lg:min-h-screen">
          <slot />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>

</template>

<style scoped>
.sidebar-container {
  top: 0;
  height: auto;
}

@media (min-width: 1024px) {
  .sidebar-container {
    top: var(--sidebar-top);
    height: var(--sidebar-height);
    overflow-y: auto;
  }
}
</style>